import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TuiLoaderModule } from '@taiga-ui/core';

interface productdto {
  products?:product[]
  empty:boolean
}

interface product {
  id:number
  name:string
  price:number
  picture_path:string
}

@Component({
  selector: 'app-client-cart-ui',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule],
  templateUrl: './client-cart-ui.component.html',
  styleUrls: ['./client-cart-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCartUiComponent implements OnChanges { 

  @Input() productDto!:productdto

  cartStatus:boolean = true

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productDto'].currentValue!=undefined){
      this.loading=false
      if(this.productDto.empty==true){
        this.cartStatus=false
      }
    }
  }

  loading:boolean = true

}
