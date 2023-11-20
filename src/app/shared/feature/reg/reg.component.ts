import { Component, Inject } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDialogContext, TuiErrorModule, TuiLoaderModule, TuiPrimitiveTextfieldModule } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';
import { lastValueFrom } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.less'],
  standalone:true,
  providers:[AuthService],
  imports: [FormsModule, ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiInputPasswordModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule]
})
export class RegComponent {
  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>, private formBuilder: FormBuilder, private authService: AuthService,private router:Router) { }

  loading: boolean = false

  RegForm = this.formBuilder.group({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  });
  
  async onSubmit(RegForm:FormGroup){
    this.enabled = false
    this.loading = true
    const request = this.authService.register(RegForm.value.name,RegForm.value.surname,RegForm.value.mail,RegForm.value.password)
    const response = await lastValueFrom(request);
    if (response.success == 0) {
      this.enabled = true
      console.log('error')
      this.loading = false
    } else {
      this.loading = false
      this.context.completeWith(true);
      this.router.navigate(['/login'])
    }
  }

  enabled = false;

  error = new TuiValidationError('Неверные почта или пароль');

  get computedError(): TuiValidationError | null {
    return this.enabled ? this.error : null;
  }

}
