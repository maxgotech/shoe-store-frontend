import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private readonly http: HttpClient) { }

  GetProducts(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("type",'shoes');
    return this.http.get('/purchaseApi/api/products',{params:queryParams});
  }

}
