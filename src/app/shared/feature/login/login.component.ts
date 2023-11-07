import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder){}


  LoginForm = this.formBuilder.group({
    mail: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    console.warn('Your order has been submitted', this.LoginForm.value);
    this.LoginForm.reset();
  }

}
