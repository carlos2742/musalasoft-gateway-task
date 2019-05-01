import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GatewaysComponent } from './components/gateways/gateways.component';
import { AppRoutingModule } from './/app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GatewayCardComponent } from './components/gateway-card/gateway-card.component';
import {GatewaysService} from './services/gateways.service';
import { FormDevComponent } from './components/form-dev/form-dev.component';
import { FormGwComponent } from './components/form-gw/form-gw.component';
import {DevicesService} from './services/devices.service';


@NgModule({
  declarations: [
    AppComponent,
    GatewaysComponent,
    GatewayCardComponent,
    FormDevComponent,
    FormGwComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    GatewaysService,
    DevicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
