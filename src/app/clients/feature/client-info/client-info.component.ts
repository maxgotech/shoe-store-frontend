import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterUiComponent } from '../../../shared/ui/footer-ui/footer-ui.component';
import { ClientInfoUiComponent } from '../../ui/client-info-ui/client-info-ui.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { ClientsService } from '../../data-access/clients.service';
@Component({
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.less'],
    standalone: true,
    imports: [HeaderComponent, ClientInfoUiComponent, FooterUiComponent]
})
export class ClientInfoComponent {
  constructor(private router: Router,private clientsService:ClientsService){
  }

}
