import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.less']
})
export class ProductCardsComponent {
  @Input() products:any
  constructor(){

  }

}
