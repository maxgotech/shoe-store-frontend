import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/data-access/auth.service';

interface cart {
  product:product
}

interface product {
  id:number
  name:string
  price:number
  picture_path:string
}

interface buyProductDto {
  quantity:number
  markup:number
  productId:prodIds
  userId:number
}

interface prodIds {
  id:number
}

interface markup {
  Id:number
  markup:number
}

interface SalesInfo {
  count_mounth:number,
  all_products:SalesProd[]
}

interface SalesProd {
  product:string
  price:number
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  ClientInfo() {
    return this.authService.currentUserValue
  }

  findCart(userId:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",userId);
    return this.http.get<cart[]>('purchaseApi/api/cart',{params:queryParams})
  }

  buyProducts(bought_prod:buyProductDto){
    return this.http.post<any>('purchaseApi/api/purchase',{quantity:bought_prod.quantity, markup:bought_prod.markup, productId:bought_prod.productId, userId:bought_prod.userId})
  }

  deleteProdFromCart(id:number){
    return this.http.delete<any>('purchaseApi/api/cart/'+id)
  }

  allProducts(id:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userid",id);
    queryParams = queryParams.append("type",'shoes');
    return this.http.get<any>('markupApi/stock/stockby/params',{params:queryParams})
  }

  addMarkup(markup:markup[]){
    return this.http.patch<any>('markupApi/markup/add',markup)
  }

  genOrders(sales:SalesInfo){
    return this.http.post<any>('salesApi/gen_orders/',sales)
  }

  salesInfo(sales:any){
    return this.http.post<any>('salesApi/info_data/',sales)
  }

  analysis_Dynamic(data:any){
    return this.http.post<any>('analysisApi/dynamic_sells/',data)
  }

  analysis_ABC(data:any){
    return this.http.post<any>('analysisApi/abc/',data)
  }

  analysis_XYZ(data:any){
    return this.http.post<any>('analysisApi/xyz/',data)
  }

}
