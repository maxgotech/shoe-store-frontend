import { Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { lastValueFrom, take } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { FooterComponent } from '../../shared/ui/footer/footer.component';
import { ProductCardsComponent } from '../ui/productCards/product-cards.component';
import { CarouselComponent } from '../ui/carousel/carousel.component';
import { HeaderComponent } from '../../shared/ui/header/header.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: true,
    imports: [HeaderComponent, CarouselComponent, ProductCardsComponent, FooterComponent]
})
export class HomeComponent implements OnInit {
  constructor(private homeService:HomeService,private authService:AuthService){
  }

  ngOnInit(): void {
    this.loggedIn = !!this.authService.currentUserValue;
    this.GetData()
  }

  loggedIn:boolean = false
  products:any

  async GetData(){
    const data = this.homeService.products.pipe(take(1))
    const response = await lastValueFrom(data)
    this.products=response
  }

  logout(flag:boolean){
    if(flag==true){
      this.authService.logout()
      window.location.reload();
    }
  }

}
