import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientSalesUiComponent } from '../../ui/client-sales-ui/client-sales-ui.component';
import { ClientsService } from '../../data-access/clients.service';
import { lastValueFrom, map } from 'rxjs';

interface SalesInfo {
  count_mounth:number,
  all_products:SalesProd[]
}

interface SalesProd {
  product:string
  price:number
}

@Component({
  selector: 'app-client-sales',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent,
    ClientSalesUiComponent
  ],
  templateUrl: './client-sales.component.html',
  styleUrls: ['./client-sales.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSalesComponent implements OnInit { 
  constructor(private clientService:ClientsService, private cdr: ChangeDetectorRef){}

  user = this.clientService.ClientInfo()

  products:any
  sales:any

  ngOnInit(): void {
  }

  getProds(){
    return this.clientService.allProducts(this.user.data.id).pipe(map((prods) => {
      prods.forEach((prod: any) => {
        const price_with_markup = prod.product.price + prod.markup / 100 * prod.product.price;
        const prodToGen: SalesProd = {
          product: prod.product.name,
          price: price_with_markup
        };
        this.products = this.products.concat(prodToGen);
      });
    }
    ))
  }

  async GenSales(month:number){
    this.products = []
    const prods_req = this.getProds()
    const prod_resp = await lastValueFrom(prods_req)
    const GenObj: SalesInfo = {
      count_mounth: month,
      all_products: this.products
    };
    const orders_req = this.clientService.genOrders(GenObj)
    const orders_resp = await lastValueFrom(orders_req)
    const sales_info_req = this.clientService.salesInfo(orders_resp)
    const sales_info_resp = await lastValueFrom(sales_info_req)
    this.sales = sales_info_resp
    this.cdr.detectChanges()
  }

}
