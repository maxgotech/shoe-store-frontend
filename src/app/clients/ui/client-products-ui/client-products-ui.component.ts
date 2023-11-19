import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-products-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './client-products-ui.component.html',
  styleUrls: ['./client-products-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProductsUiComponent { }
