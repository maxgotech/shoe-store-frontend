import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from '../ui/carousel/carousel.module';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CarouselModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
