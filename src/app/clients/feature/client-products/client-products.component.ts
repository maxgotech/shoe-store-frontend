import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { ClientProductsUiComponent } from '../../ui/client-products-ui/client-products-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-client-products',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent,
    ClientProductsUiComponent
  ],
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProductsComponent implements OnInit { 
  constructor(private clientService:ClientsService){}
  user = this.clientService.ClientInfo()

  ngOnInit(): void {
    this.getProds()
  }

  getProds(){
    this.clientService.allProducts(this.user.data.id).subscribe((data)=>{
      console.log(data)
    })
  }
}
