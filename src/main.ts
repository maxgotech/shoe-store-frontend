import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpErrorInterceptor } from './app/utils/interceptors/http-error.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routes.component';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, TuiRootModule, TuiDialogModule, TuiAlertModule),
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
