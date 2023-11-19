import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/data-access/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private readonly http: HttpClient, private authService: AuthService) { }

  ClientInfo() {
    return this.authService.currentUserValue
  }

}
