import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { FooterUiComponent } from 'src/app/shared/ui/footer-ui/footer-ui.component';
import { NavBarUiComponent } from '../../ui/nav-bar-ui/nav-bar-ui.component';
import { ClientSalesUiComponent } from '../../ui/client-sales-ui/client-sales-ui.component';
import { ClientsService } from '../../data-access/clients.service';
import { lastValueFrom, map } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import { DynamicAnalysisComponent } from '../../ui/dialogs/dynamic_analysis/dynamic_analysis.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AbcAnalysisComponent } from '../../ui/dialogs/abc_analysis/abc_analysis.component';
import { XyzAnalysisComponent } from '../../ui/dialogs/xyz_analysis/xyz_analysis.component';

interface SalesInfo {
  count_mounth: number,
  all_products: SalesProd[]
}

interface SalesProd {
  product: string
  price: number
}

@Component({
  selector: 'app-client-sales',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterUiComponent,
    NavBarUiComponent,
    ClientSalesUiComponent
  ],
  templateUrl: './client-sales.component.html',
  styleUrls: ['./client-sales.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSalesComponent implements OnInit, OnDestroy {
  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService, private clientService: ClientsService, private cdr: ChangeDetectorRef) {
    this.timer = setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      this.cdr.markForCheck();
    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  timer: any

  numberOfTicks = 0;
  user = this.clientService.ClientInfo()

  products: any
  sales: any

  ngOnInit(): void {
  }

  getProds() {
    return this.clientService.allProducts(this.user.data.id).pipe(map((prods) => {
      prods.forEach((prod: any) => {
        const price_with_markup = prod.product.price + prod.markup / 100 * prod.product.price;
        const prodToGen: SalesProd = {
          product: prod.product.name,
          price: price_with_markup
        };
        this.products = this.products.concat(prodToGen);
      });
    }
    ))
  }

  async GenSales(month: number) {
    this.products = []
    const prods_req = this.getProds()
    const prod_resp = await lastValueFrom(prods_req)
    const GenObj: SalesInfo = {
      count_mounth: month,
      all_products: this.products
    };
    const orders_req = this.clientService.genOrders(GenObj)
    const orders_resp = await lastValueFrom(orders_req)
    const sales_info_req = this.clientService.salesInfo(orders_resp)
    const sales_info_resp = await lastValueFrom(sales_info_req)
    this.sales = sales_info_resp
    this.cdr.detectChanges()
  }

  dynamic_loader: boolean = false
  async dynamic_analysis(flag: boolean) {
    this.dynamic_loader = true
    if (flag == true) {
      const dynamic_req = this.clientService.analysis_Dynamic(this.sales)
      const dynamic_resp = await lastValueFrom(dynamic_req)
      if (dynamic_resp) {
        this.dynamic_loader = false
      }
      const dial = this.dialogs.open<number>(
        new PolymorpheusComponent(DynamicAnalysisComponent),
        {
          data: dynamic_resp,
          dismissible: true,
          label: 'Динамический анализ',
        },
      );
      this.showDialog(dial)
    }
  }

  abc_loader: boolean = false
  async abc_analysis(flag: boolean) {
    this.abc_loader = true
    if (flag == true) {
      const abc_req = this.clientService.analysis_ABC(this.sales)
      const abc_resp = await lastValueFrom(abc_req)
      if (abc_resp) {
        this.abc_loader = false
      }
      const dial = this.dialogs.open<number>(
        new PolymorpheusComponent(AbcAnalysisComponent),
        {
          data: abc_resp,
          dismissible: true,
          label: 'ABC анализ',
        },
      );
      this.showDialog(dial)
    }
  }

  xyz_loader: boolean = false
  async xyz_analysis(flag: boolean) {
    this.xyz_loader = true
    if (flag == true) {
      const xyz_req = this.clientService.analysis_XYZ(this.sales)
      const xyz_resp = await lastValueFrom(xyz_req)
      if (xyz_resp) {
        this.xyz_loader = false
      }
      const dial = this.dialogs.open<number>(
        new PolymorpheusComponent(XyzAnalysisComponent),
        {
          data: xyz_resp,
          dismissible: true,
          label: 'XYZ анализ',
        },
      );
      this.showDialog(dial)
    }
  }

  showDialog(dialog:any): void {
    dialog.subscribe({
      next: (data:any) => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

}
