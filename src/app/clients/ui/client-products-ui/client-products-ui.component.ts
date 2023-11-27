import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiCheckboxModule, TuiInputNumberModule, tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';

interface productdto {
  products?: product[]
  empty: boolean
  fullprice:number
  fullprice_with_markup:number
}

interface product {
  id: number
  name: string
  price: number
  picture_path: string
  markup:number
  price_with_markup:number
}

interface markup {
  Id:number
  markup:number
}

@Component({
  selector: 'app-client-products-ui',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule, TuiCheckboxModule, FormsModule, ReactiveFormsModule, TuiButtonModule, TuiInputNumberModule],
  templateUrl: './client-products-ui.component.html',
  styleUrls: ['./client-products-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputNumberOptionsProvider({
        decimal: 'never',
        step: 1,
    }),
  ],
})
export class ClientProductsUiComponent implements OnChanges { 
  constructor(private formBuilder: FormBuilder){}

  @Input() productDto!: productdto

  @Output() AddMarkup = new EventEmitter<markup[]>()

  MarkupAdd(markup:markup[]){
    this.AddMarkup.emit(markup)
  }

  prodStatus: boolean = true // статус корзины false-пусто/true-есть товары

  myGroup: any; // форма

  loading: boolean = true; // лоадер работает пока не получены данные

  readonly control = new FormControl(0);

  ngOnChanges(changes: SimpleChanges): void {
    let helper: boolean[] = [] // массив значений checkmark
    if (changes['productDto'].currentValue != undefined) { // данные получены
      this.loading = false // убираем лоадер
      if (this.productDto.empty == true) { // если товаров нету
        this.prodStatus = false
      } else {
        this.productDto.products!.forEach(element => {  // если товары есть
          helper = helper.concat(false) // загружаем false на checkmark каждого элемента
        })
        console.log(this.productDto.products)
        this.initGroup(helper) // грузим форму
      }
    }
  }

  initGroup(helper: any) { //инициализация формы
    this.myGroup = this.formBuilder.group({
      myCategory: this.formBuilder.array(helper)
    });
  }

  GroupValues(index: number) {
    return this.myGroup.get('myCategory').value[index]
  }

  submit(){
    let prods = [
      ... this.productDto.products!
    ]
    let addMarkup: markup[] = []
    for (let i = 0; i < prods.length; i++) {
      if(this.GroupValues(i)==true){
        const mark:markup = {
          Id:prods[i].id,
          markup:this.control.value!
        }
        addMarkup = addMarkup.concat(mark)
      }
    }
    
    if(addMarkup.length==0){
      console.log('nothing')
    } else {
      this.MarkupAdd(addMarkup)
    }
  }

}
