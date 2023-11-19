import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TuiValidationError } from '@taiga-ui/cdk';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { TuiPrimitiveTextfieldModule, TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    standalone: true,
    providers:[AuthService],
    imports: [FormsModule, ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputPasswordModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule]
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router:Router) { }

  loading: boolean = false
  LoginForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ResponseData: any

  async onSubmit() {
    this.enabled = false
    this.loading = true
    const data = this.authService.login(this.LoginForm.value.mail!, this.LoginForm.value.password!)
    const response = await lastValueFrom(data)
    this.ResponseData = response
    console.log(this.ResponseData)
    if (this.ResponseData.success == 0) {
      this.enabled = true
      console.log('error')
      this.loading = false
    } else {
      this.loading = false
      await this.delay(1000);
      this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
    }
  }

  enabled = false;

  error = new TuiValidationError('Неверные почта или пароль');

  get computedError(): TuiValidationError | null {
    return this.enabled ? this.error : null;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
