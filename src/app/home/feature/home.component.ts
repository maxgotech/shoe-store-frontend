import { Component } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  constructor(private homeService:HomeService){
    this.GetData()
  }

  products:any

  async GetData(){
    const data = this.homeService.GetProducts()
    const response = await lastValueFrom(data)
    this.products = response
    console.log(response)
  }

}
