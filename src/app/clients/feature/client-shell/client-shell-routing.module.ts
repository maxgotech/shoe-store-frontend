import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientShellComponent } from './client-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ClientShellComponent,
    children:[
      {
        path:'info',
        loadChildren: async () =>
        (await  import('../client-info/client-info.module')).ClientInfoModule
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientShellRoutingModule {}