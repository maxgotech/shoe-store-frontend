import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from 'src/app/home/feature/home-routing.module';
import { TuiDropdownModule, TuiDataListModule, TuiButtonModule } from '@taiga-ui/core';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomePageRoutingModule,
    TuiDropdownModule,
    TuiDataListModule,
    TuiButtonModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
