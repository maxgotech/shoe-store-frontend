import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface User {
  success:number
  message:string
  data:data
}

interface data {
  id:number
  name:string
  surname:string
  mail:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(mail: string, password: string) {
    return this.http.post<any>('/markupApi/auth/log', { mail, password }).pipe(
      map(user => {
        // login successful if there's a success==1 in response
        if (user && user.success==1) {
          // store user details in local
          // storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // get the user nulled - typescript won't care
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(name:string, surname:string, mail: string, password: string) {
		return this.http.post<any>('/markupApi/auth/reg', { name , surname , mail, password });
	}

}
