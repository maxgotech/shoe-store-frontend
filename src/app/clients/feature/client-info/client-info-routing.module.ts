import { NgModule } from '@angular/core';
import { ClientInfoComponent } from './client-info.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ClientInfoRoutingModule { }
