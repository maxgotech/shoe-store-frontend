import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardsComponent } from './product-cards.component';

@NgModule({
  declarations: [ProductCardsComponent],
  imports: [
    CommonModule
  ],
  exports:[ProductCardsComponent]
})
export class ProductCardsModule { 
}
