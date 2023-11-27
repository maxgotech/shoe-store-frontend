import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { ClientProductsUiComponent } from '../../ui/client-products-ui/client-products-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientsService } from '../../data-access/clients.service';
import { lastValueFrom, map } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

interface productdto {
  products?:product[]
  empty:boolean
  fullprice:number
  fullprice_with_markup:number
}

interface product {
  id:number
  name:string
  price:number
  picture_path:string
  markup:number
  price_with_markup:number
}

interface markup {
  Id:number
  markup:number
}

@Component({
  selector: 'app-client-products',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent,
    ClientProductsUiComponent
  ],
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProductsComponent implements OnInit { 
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService, private clientService:ClientsService, private cdr: ChangeDetectorRef){}
  user = this.clientService.ClientInfo()

  ngOnInit(): void {
    this.getProds()
    console.log(this.user)
  }

  productDto!:productdto
  products:product[] = []
  fullprice:number = 0
  fullprice_with_markup:number = 0
  fullprodData:any

  getProds(){
    this.fullprice = 0
    this.fullprice_with_markup = 0
    this.fullprodData = []
    this.products = []
    this.clientService.allProducts(this.user.data.id).pipe(map((prods)=>{
      prods.forEach((element:any) => {
        const price_with_markup = element.product.price + element.markup/100*element.product.price
        const prod:product = {
          ... element.product,
          markup:element.markup,
          price_with_markup:price_with_markup
        }
        this.fullprice_with_markup +=price_with_markup
        this.fullprice +=element.product.price
        this.products = this.products!.concat(prod)
        this.fullprodData = this.fullprodData.concat(element)
      });
    })).subscribe((data)=>{
      if(this.products.length==0){
        this.productDto = {
          empty:true,
          fullprice:this.fullprice,
          fullprice_with_markup:this.fullprice_with_markup
        }
      } else
      {
        this.productDto = {
          products:this.products,
          empty: false,
          fullprice:this.fullprice,
          fullprice_with_markup:this.fullprice_with_markup
        }
      }
      this.cdr.detectChanges()
    })
  }

  async addMarkup(markup:markup[]){
    let markups:markup[] = []
    this.fullprodData.forEach((prod:any) => {
      markup.forEach(mark => {
        if(prod.product.id==mark.Id){
          const markAdd:markup = {
            Id:prod.id,
            markup:mark.markup
          }
          markups = markups.concat(markAdd)
        }
      });
    });
    const mark_req = this.clientService.addMarkup(markups)
    const mark_resp = await lastValueFrom(mark_req)
    this.showNotification(markup[0].markup)
    this.getProds()
  }

  showNotification(mark:number): void {
    this.alerts
      .open('Выбранная наценка '+mark+'%',{ label: 'Наценка добавлена!' })
      .subscribe();
  }

}
