import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap, shareReplay  } from 'rxjs/operators';
const REFRESH_INTERVAL = 10000;
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private readonly http: HttpClient) { }

  private cache$!: Observable<Array<any>>;
  get products() {
    if (!this.cache$) {
      // Set up timer that ticks every X milliseconds
      const timer$ = timer(0, REFRESH_INTERVAL);

      // For each tick make an http request to fetch new data
      console.log('new data triggered')
      this.cache$ = timer$.pipe(
        switchMap(_ => this.requestProducts()),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cache$;
  }

  private requestProducts() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("type",'shoes');
    return this.http.get<any>('https://api-purchase-service.onrender.com/api/products',{params:queryParams});
  }

  addToCart(productId:number, userId:number){
    return this.http.post('purchaseApi/api/cart',{productId,userId})
  }

}
