import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/kit';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiErrorModule } from '@taiga-ui/core';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiAutoFocusModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiInputModule,
    TuiLoaderModule,
    TuiErrorModule,
    RouterModule.forChild([tuiGenerateDialogableRoute(LoginComponent)]),
  ],
  exports:[LoginComponent]
})
export class LoginModule {
  constructor(){}

}
