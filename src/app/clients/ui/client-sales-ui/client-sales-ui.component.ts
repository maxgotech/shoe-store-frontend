import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputNumberModule, tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';

interface info_sales {
  all_month:months[]
}

interface months {
  date:Date
  final_price_for_all_products:number
  final_price_for_product:prod[]
}

interface prod {
  name:string
  price:number
}

@Component({
  selector: 'app-client-sales-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    TuiLoaderModule,
    ReactiveFormsModule, 
    TuiButtonModule, 
    TuiInputNumberModule,
    TuiTableModule
  ],
  providers: [
    tuiInputNumberOptionsProvider({
        decimal: 'never',
        step: 1,
    }),
  ],
  templateUrl: './client-sales-ui.component.html',
  styleUrls: ['./client-sales-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSalesUiComponent implements OnChanges { 
  constructor(){}

  readonly columns = ['date','earnings']

  @Input() sales:info_sales | undefined

  @Output() month_gen = new EventEmitter<number>()

  loading_sales: boolean = false; // лоадер работает пока не получены данные

  show_sales:boolean = false // показываем данные о покупках после их получения

  send_month(month:number){
    this.month_gen.emit(month)
  }

  readonly control = new FormControl(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sales'].currentValue != undefined) {
      this.loading_sales = false // убираем лоадер
      this.show_sales = true
      console.log(this.sales)
    }
  }

  submit(){
    this.loading_sales=true
    this.show_sales = false
    this.send_month(this.control.value!)
  }

}
