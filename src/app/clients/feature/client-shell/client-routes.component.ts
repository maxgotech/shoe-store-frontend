import { ClientsService } from "../../data-access/clients.service";
import { ClientInfoComponent } from "../client-info/client-info.component";

export default [
  {
    path: '',
    pathMatch:'prefix',
    providers:[ClientsService],
    children: [
      {
        path:'info',component:ClientInfoComponent
      }
    ]
  }
]