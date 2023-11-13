import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInfoRoutingModule } from './client-info-routing.module';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { ClientInfoComponent } from './client-info.component';

@NgModule({
  declarations: [ClientInfoComponent],
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports:[ClientInfoComponent]
})
export class ClientInfoModule { }
