import { LoginComponent } from "src/app/shared/feature/login/login.component";
import { HomeComponent } from "./home.component";
import { GenerateDialogableRoute } from "src/app/utils/RouteDialog/GeneratedDialogableRoute.component";
export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      GenerateDialogableRoute(LoginComponent,'login')
    ]
  }
]