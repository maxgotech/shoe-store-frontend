import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-product-cards',
    templateUrl: './product-cards.component.html',
    styleUrls: ['./product-cards.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor]
})
export class ProductCardsComponent implements OnChanges {

  @Input() products:any

  @Output() AddCart = new EventEmitter<number>();

  AddToCart(id:number){
    this.AddCart.emit(id)
  }

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['products'].currentValue!=null){
      this.loaded=true
      console.log(this.products)
    }
  }

  loaded:boolean = false

}
