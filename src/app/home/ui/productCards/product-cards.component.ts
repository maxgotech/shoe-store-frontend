import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardsComponent implements OnChanges {
  @Input() products:any
  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['products'].currentValue!=null){
      this.loaded=true
      console.log(this.products)
    }
  }

  loaded:boolean = false

}
