import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from 'src/app/home/feature/home-routing.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomePageRoutingModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
