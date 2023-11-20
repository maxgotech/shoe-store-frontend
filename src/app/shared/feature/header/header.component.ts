import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderUiComponent } from '../../ui/header-ui/header-ui.component';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loggedIn = !!this.authService.currentUserValue;
  }

  loggedIn: boolean = false

  async logout(flag: boolean) {
    if (flag == true) {
      this.authService.logout()
      this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
    }
  }

}
