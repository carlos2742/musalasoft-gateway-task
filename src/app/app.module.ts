import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GatewaysComponent } from './components/gateways/gateways.component';
import { DevicesComponent } from './components/devices/devices.component';
import { AppRoutingModule } from './/app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GatewayCardComponent } from './components/gateway-card/gateway-card.component';
import {GatewaysService} from './services/gateways.service';


@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    DevicesComponent,
    GatewayCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [GatewaysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
