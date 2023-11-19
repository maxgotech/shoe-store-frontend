import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
@Component({
  selector: 'app-client-info-ui',
  templateUrl: './client-info-ui.component.html',
  styleUrls: ['./client-info-ui.component.less'],
  standalone: true,
  imports: [TuiInputModule, ReactiveFormsModule]
})
export class ClientInfoUiComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.UserForm.controls['name'].setValue(this.user.name)
    this.UserForm.controls['surname'].setValue(this.user.surname)
    this.UserForm.controls['mail'].setValue(this.user.mail)
  }

  @Input() user:any

  UserForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

}
