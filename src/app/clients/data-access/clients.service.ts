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

}
