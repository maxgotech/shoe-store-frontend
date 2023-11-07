import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegComponent } from './reg.component';



@NgModule({
  declarations: [RegComponent],
  imports: [
    CommonModule
  ],
  exports:[RegComponent]
})
export class RegModule { }
