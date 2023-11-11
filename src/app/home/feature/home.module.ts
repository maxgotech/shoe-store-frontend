import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from '../ui/carousel/carousel.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';
import { ProductCardsModule } from '../ui/productCards/product-cards.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CarouselModule,
    HeaderModule,
    ProductCardsModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
