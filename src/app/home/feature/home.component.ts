import { Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { lastValueFrom, take } from 'rxjs';
import { FooterUiComponent } from '../../shared/ui/footer-ui/footer-ui.component';
import { ProductCardsComponent } from '../ui/productCards/product-cards.component';
import { CarouselComponent } from '../ui/carousel/carousel.component';
import { HeaderComponent } from 'src/app/shared/feature/header/header.component';
import { AuthService } from 'src/app/shared/data-access/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: true,
    imports: [HeaderComponent, CarouselComponent, ProductCardsComponent, FooterUiComponent]
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService,private homeService:HomeService){}

  ngOnInit(): void {
    this.GetData()
  }

  products:any
  user = this.authService.currentUserValue

  async GetData(){
    const data = this.homeService.products.pipe(take(1))
    const response = await lastValueFrom(data)
    this.products=response
  }

  async addToCart(productId:number){
    this.homeService.addToCart(productId,this.user.data.id)
  }

}
