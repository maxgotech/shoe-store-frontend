import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderUiComponent } from '../../ui/header-ui/header-ui.component';
import { AuthService } from '../../data-access/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [AuthService],
  imports: [
    CommonModule,
    HeaderUiComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = !!this.authService.currentUserValue;
  }

  loggedIn: boolean = false

  logout(flag: boolean) {
    if (flag == true) {
      this.authService.logout()
      window.location.reload();
    }
  }

}
