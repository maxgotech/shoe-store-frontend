import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientCartUiComponent } from '../../ui/client-cart-ui/client-cart-ui.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { ClientsService } from '../../data-access/clients.service';
import { map } from 'rxjs';

interface productdto {
  products?:product[]
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
  constructor(private authService:AuthService, private clientService:ClientsService, private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.FindCart()
  }

  user = this.authService.currentUserValue
  productDto!:productdto
  products:product[] = []
  cart:any

  async FindCart(){
    this.products = []
    this.cart = []
    this.clientService.findCart(this.user.data.id).pipe(map((carts)=>{
      carts.forEach(element => {
        this.products = this.products!.concat(element.product)
        this.cart = this.cart.concat(element)
      });
    })).subscribe((data)=>{
      if(this.products.length==0){
        this.productDto = {
          empty:true
        }
      } else
      {
        this.productDto = {
          products:this.products,
          empty: false
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
  }
}
