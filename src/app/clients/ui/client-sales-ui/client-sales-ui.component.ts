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

  @Input() dynamic_loader:boolean = false

  @Input() abc_loader:boolean = false

  @Input() xyz_loader:boolean = false

  @Output() month_gen = new EventEmitter<number>()

  @Output() dynamic_analysis= new EventEmitter<boolean>()

  @Output() abc_analysis = new EventEmitter<boolean>()

  @Output() xyz_analysis= new EventEmitter<boolean>()

  loading_sales: boolean = false; // лоадер работает пока не получены данные

  show_sales:boolean = false // показываем данные о покупках после их получения
  

  send_month(month:number){
    this.month_gen.emit(month)
  }

  send_dynamyc_analysis(){
    this.dynamic_analysis.emit(true)
  }

  send_abc_analysis(){
    this.abc_analysis.emit(true)
  }

  send_xyz_analysis(){
    this.xyz_analysis.emit(true)
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
