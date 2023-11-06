import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'client',
    loadChildren: async () =>
    (await  import('./clients/feature/client-shell/client-shell.module')).ClientShellModule
  },
  {
    path: 'home',
    loadChildren: async () =>
    (await import('./home/feature/home.module')).HomeModule
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
