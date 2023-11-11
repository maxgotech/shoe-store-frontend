import { Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { lastValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(private homeService:HomeService){
  }

  ngOnInit(): void {
    this.GetData()
  }

  products:any

  async GetData(){
    const data = this.homeService.products.pipe(take(1))
    const response = await lastValueFrom(data)
    this.products=response
  }

}
