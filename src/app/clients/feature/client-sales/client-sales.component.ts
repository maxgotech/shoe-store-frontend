import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientSalesUiComponent } from '../../ui/client-sales-ui/client-sales-ui.component';

@Component({
  selector: 'app-client-sales',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent,
    ClientSalesUiComponent
  ],
  templateUrl: './client-sales.component.html',
  styleUrls: ['./client-sales.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSalesComponent { }
