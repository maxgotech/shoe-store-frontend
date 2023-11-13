import { NgModule } from '@angular/core';
import { ClientShellRoutingModule } from './client-shell-routing.module';
import { ClientShellComponent } from './client-shell.component';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';

@NgModule({
  imports: [
    ClientShellRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [
    ClientShellComponent
  ],
  exports:[ClientShellComponent]
})
export class ClientShellModule {}