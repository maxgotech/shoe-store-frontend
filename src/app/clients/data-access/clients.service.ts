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

}
