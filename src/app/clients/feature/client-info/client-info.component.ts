import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { FooterUiComponent } from '../../../shared/ui/footer-ui/footer-ui.component';
import { ClientInfoUiComponent } from '../../ui/client-info-ui/client-info-ui.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';

@Component({
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.less'],
    standalone: true,
    imports: [HeaderComponent, ClientInfoUiComponent, FooterUiComponent]
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
