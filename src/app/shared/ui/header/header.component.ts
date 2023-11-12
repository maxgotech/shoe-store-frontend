import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
