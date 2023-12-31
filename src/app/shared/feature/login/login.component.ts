import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TuiValidationError } from '@taiga-ui/cdk';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { TuiPrimitiveTextfieldModule, TuiButtonModule, TuiErrorModule,TuiDialogContext } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    standalone: true,
    providers:[AuthService],
    imports: [FormsModule, ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputPasswordModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,private formBuilder: FormBuilder, private authService: AuthService,private router:Router) { }

  loading: boolean = false
  LoginForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  async onSubmit(LoginForm:FormGroup) {
    this.enabled = false
    this.loading = true
    const data = this.authService.login(LoginForm.value.mail,LoginForm.value.password)
    const response = await lastValueFrom(data)
    if (response.success == 0) {
      this.enabled = true
      console.log('error')
      this.loading = false
    } else {
      this.loading = false
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

  openReg(){
    this.context.completeWith(true);
    this.router.navigate(['/reg'])
  }

}
