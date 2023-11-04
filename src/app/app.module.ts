import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientInfoComponent } from './clients/feature/client-info/client-info.component';
import { ClientAnalyticsComponent } from './clients/feature/client-analytics/client-analytics.component';
import { ClientCartComponent } from './clients/feature/client-cart/client-cart.component';

@NgModule({
  declarations: [AppComponent, ClientInfoComponent, ClientAnalyticsComponent, ClientCartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule
],
  providers: [{provide:{TUI_SANITIZER,RouteReuseStrategy}, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
