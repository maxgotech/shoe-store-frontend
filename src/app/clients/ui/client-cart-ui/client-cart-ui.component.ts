import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiCheckboxModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

interface productdto {
  products?: product[]
  empty: boolean
}

interface product {
  id: number
  name: string
  price: number
  picture_path: string
}

@Component({
  selector: 'app-client-cart-ui',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule, TuiCheckboxModule, FormsModule, ReactiveFormsModule, TuiButtonModule],
  templateUrl: './client-cart-ui.component.html',
  styleUrls: ['./client-cart-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCartUiComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder) {
  }

  @Input() productDto!: productdto

  cartStatus: boolean = true // статус корзины false-пусто/true-есть товары

  myGroup: any; // форма

  loading: boolean = true; // лоадер работает пока не получены данные

  ngOnChanges(changes: SimpleChanges): void {
    let helper: boolean[] = [] // массив значений checkmark
    if (changes['productDto'].currentValue != undefined) { // данные получены
      this.loading = false // убираем лоадер
      if (this.productDto.empty == true) { // если товаров нету
        this.cartStatus = false
      } else {
        this.productDto.products!.forEach(element => {  // если товары есть
          helper = helper.concat(false) // загружаем false на checkmark каждого элемента
        })
        this.initGroup(helper) // грузим форму
      }
    }
  }

  initGroup(helper: any) { //инициализация формы
    this.myGroup = this.formBuilder.group({
      myCategory: this.formBuilder.array(helper)
    });
  }

  submit() {
    let prods = [
      ... this.productDto.products!
    ]
    let bought: any[] = []
    for (let i = 0; i < prods.length; i++) {
      if(this.GroupValues(i)==true){
        bought = bought.concat(prods[i])
      }
    }
    // TODO send that to parent
    if(bought.length==0){
      console.log('nothing')
    } else
    {
      console.log(bought)
    }
  }

  GroupValues(index: number) {
    return this.myGroup.get('myCategory').value[index]
  }

}
