import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ClientCartUiComponent } from '../../ui/client-cart-ui/client-cart-ui.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientsService } from '../../data-access/clients.service';
import { map } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

interface productdto {
  products?:product[]
  fullprice:number
  empty:boolean
}

interface product {
  id:number
  name:string
  price:number
  picture_path:string
}

interface prodIds {
  id:number
}

interface buyProductDto {
  quantity:number
  markup:number
  productId:prodIds
  userId:number
}

@Component({
  selector: 'app-client-cart',
  standalone: true,
  imports: [
    CommonModule,
    ClientCartUiComponent,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent
  ],
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCartComponent implements OnInit { 
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService, private clientService:ClientsService, private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.FindCart()
  }

  user = this.clientService.ClientInfo()
  productDto!:productdto
  products:product[] = []
  cart:any
  cartprice:number = 0

  async FindCart(){
    this.products = []
    this.cart = []
    this.clientService.findCart(this.user.data.id).pipe(map((carts)=>{
      carts.forEach(element => {
        this.products = this.products!.concat(element.product)
        this.cartprice +=element.product.price
        this.cart = this.cart.concat(element)
      });
    })).subscribe((data)=>{
      if(this.products.length==0){
        this.productDto = {
          empty:true,
          fullprice:this.cartprice
        }
      } else
      {
        this.productDto = {
          products:this.products,
          empty: false,
          fullprice:this.cartprice
        }
      }
      this.cdr.detectChanges()
    })
  }

  async buy_products(prods:prodIds[]){
    prods.forEach(async prodid => {
      const obj:buyProductDto = {
        quantity:1,
        markup:0,
        productId:prodid,
        userId:this.user.data.id
      }
      this.clientService.buyProducts(obj).subscribe((data)=>{
        console.log('bought')
      })
      this.cart.forEach((element: any) => {
        if(element.product.id==prodid){
          this.clientService.deleteProdFromCart(element.id).subscribe((data)=>{
            console.log('deleted')
          })
        }
      });
    });
    this.FindCart()
    this.showNotification()
  }

  showNotification(): void {
    this.alerts
      .open('',{ label: 'Товары успешно приобретены!' })
      .subscribe();
  }

}
