import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/kit';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiAutoFocusModule,
    TuiInputModule,
    RouterModule.forChild([tuiGenerateDialogableRoute(LoginComponent)]),
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
