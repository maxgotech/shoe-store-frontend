import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MarkupService {

  constructor(private readonly http: HttpClient) { }

  log(mail:string,password:string){
    return this.http.post('/markupApi/auth/log', {mail,password} );
  }

}
