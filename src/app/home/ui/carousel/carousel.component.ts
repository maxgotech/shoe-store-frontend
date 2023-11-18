import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiItemModule } from '@taiga-ui/cdk';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { TuiCarouselModule, TuiPaginationModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiCarouselModule, NgFor, TuiItemModule, TuiPaginationModule,NgOptimizedImage]
})
export class CarouselComponent {
  index = 0;
  
  readonly items = [
    'black-LED-shoes.jpg',
    'boots-against-the-wall.jpg',
    'brown-boots-on-the-curb.jpg',
    'mens-leather-dress-shoes.jpg',
    'rooftopper-looking-down.jpg',
];
}
