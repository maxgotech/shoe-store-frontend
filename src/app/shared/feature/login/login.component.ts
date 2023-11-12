import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MarkupService } from '../../data-access/markup/markup.service';
import { lastValueFrom } from 'rxjs';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder, private markupService:MarkupService){}

  loading:boolean=false
  LoginForm = this.formBuilder.group({
    mail: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });

  ResponseData:any

  async onSubmit() {
    this.enabled=false
    this.loading=true
    const data = this.markupService.log(this.LoginForm.value.mail!,this.LoginForm.value.password!)
    const response = await lastValueFrom(data)
    this.ResponseData = response
    if(this.ResponseData.success==0){
      this.enabled=true
      console.log('error')
    } else{
      console.log(this.ResponseData)
    }
    this.loading=false
  }

  enabled = false;
 
    error = new TuiValidationError('Неверные пароль или почта');
 
    get computedError(): TuiValidationError | null {
        return this.enabled ? this.error : null;
    }

}
