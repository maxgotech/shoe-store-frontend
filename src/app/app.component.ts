import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: true,
  imports: [TuiRootModule, RouterOutlet, TuiAlertModule]
})
export class AppComponent {
  title = 'shoe-store-frontend';
}
