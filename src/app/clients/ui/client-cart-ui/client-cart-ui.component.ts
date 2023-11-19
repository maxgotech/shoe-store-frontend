import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-cart-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './client-cart-ui.component.html',
  styleUrls: ['./client-cart-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCartUiComponent { }
