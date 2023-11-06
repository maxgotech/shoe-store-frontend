import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from '../ui/carousel/carousel.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CarouselModule,
    HeaderModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
