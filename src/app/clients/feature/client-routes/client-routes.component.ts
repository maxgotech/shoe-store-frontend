import { ClientsService } from "../../data-access/clients.service";
import { ClientCartComponent } from "../client-cart/client-cart.component";
import { ClientInfoComponent } from "../client-info/client-info.component";
import { ClientProductsComponent } from "../client-products/client-products.component";
import { ClientSalesComponent } from "../client-sales/client-sales.component";

export default [
  {
    path: '',
    providers: [ClientsService],
    children: [
      {
        path:'info',
        component: ClientInfoComponent
      },
      {
        path: 'cart',
        component: ClientCartComponent
      },
      {
        path: 'products',
        component: ClientProductsComponent
      },
      {
        path: 'sales',
        component: ClientSalesComponent
      }
    ]
  }
]