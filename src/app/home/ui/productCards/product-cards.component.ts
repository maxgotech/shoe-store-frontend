import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';

interface Cart {
  name: string
  id: number
}

@Component({
    selector: 'app-product-cards',
    templateUrl: './product-cards.component.html',
    styleUrls: ['./product-cards.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor,TuiSvgModule]
})
export class ProductCardsComponent implements OnChanges {

  @Input() products:any

  @Output() AddCart = new EventEmitter<Cart>();

  AddToCart(name:string,id:number){
    const cart:Cart = {
      name:name,
      id:id
    }
    this.AddCart.emit(cart)
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
