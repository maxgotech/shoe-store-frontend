import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TuiRoutableDialogModule } from '@taiga-ui/kit';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: 'login',
        loadChildren: async () =>
        (await import('src/app/shared/feature/login/login.module')).LoginModule
      },
    ]
  }
];

@NgModule({
  imports: [
  TuiRoutableDialogModule,
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}