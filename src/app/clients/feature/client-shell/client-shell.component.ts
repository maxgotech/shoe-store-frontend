import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';

@Component({
  selector: 'app-client-shell',
  templateUrl: './client-shell.component.html',
  styleUrls: ['./client-shell.component.less']
})
export class ClientShellComponent {
  constructor(private authService:AuthService,private router: Router){}

  logout(flag:boolean){
    if(flag==true){
      this.authService.logout()
      this.router.navigate(['']);
    }
  }

}
