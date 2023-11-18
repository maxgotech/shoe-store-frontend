import { LoginComponent } from "src/app/shared/feature/login/login.component";
import { HomeComponent } from "./home.component";

export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
]