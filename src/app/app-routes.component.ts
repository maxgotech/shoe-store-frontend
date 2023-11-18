import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: 'client',
    loadChildren: async () => (await import('./clients/feature/client-routes/client-routes.component'))
  },
  {
    path: '',
    loadChildren: async () => (await import('./home/feature/home-routing.component'))
  },
  {
    path: '**',
    redirectTo: ''
  }
];