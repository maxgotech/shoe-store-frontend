import { LoginComponent } from "src/app/shared/feature/login/login.component";
import { HomeComponent } from "./home.component";
import { GenerateDialogableRoute } from "src/app/utils/RouteDialog/GeneratedDialogableRoute.component";
import { RegComponent } from "src/app/shared/feature/reg/reg.component";
export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      GenerateDialogableRoute(LoginComponent,'login'),
      GenerateDialogableRoute(RegComponent,'reg'),
    ]
  }
]