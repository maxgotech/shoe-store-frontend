import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';

@Component({
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.less']
})
export class ClientInfoComponent {
  constructor(private authService:AuthService,private router: Router){
    
  }

  logout(flag:boolean){
    if(flag==true){
      this.authService.logout()
      this.router.navigate(['']);
    }
  }

}
