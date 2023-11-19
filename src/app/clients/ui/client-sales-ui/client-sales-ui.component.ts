import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-sales-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './client-sales-ui.component.html',
  styleUrls: ['./client-sales-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSalesUiComponent { }
