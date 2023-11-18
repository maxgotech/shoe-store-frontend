import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiDropdownModule } from '@taiga-ui/core/directives/dropdown';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, NgIf, TuiDropdownModule, TuiDataListModule, RouterOutlet]
})
export class HeaderComponent {

  @Input() loggedIn: boolean = false;

  @Output() loggedOut = new EventEmitter<boolean>();

  index = 0;

  readonly items = [
    'black-LED-shoes.jpg',
    'boots-against-the-wall.jpg',
    'brown-boots-on-the-curb.jpg',
    'mens-leather-dress-shoes.jpg',
    'rooftopper-looking-down.jpg',
  ];

  logout(){
    this.loggedOut.emit(true)
  }

}
