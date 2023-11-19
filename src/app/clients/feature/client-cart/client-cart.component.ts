import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientCartUiComponent } from '../../ui/client-cart-ui/client-cart-ui.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';

@Component({
  selector: 'app-client-cart',
  standalone: true,
  imports: [
    CommonModule,
    ClientCartUiComponent,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent
  ],
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCartComponent { }
