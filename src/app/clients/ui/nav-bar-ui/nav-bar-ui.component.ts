import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './nav-bar-ui.component.html',
  styleUrls: ['./nav-bar-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarUiComponent { }
