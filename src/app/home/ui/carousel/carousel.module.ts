import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { TuiCarouselModule, TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiPaginationModule
  ],
  exports:[CarouselComponent]
})
export class CarouselModule { }
