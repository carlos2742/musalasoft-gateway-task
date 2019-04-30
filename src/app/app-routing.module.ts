import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GatewaysComponent} from './components/gateways/gateways.component';
import {GatewayCardComponent} from './components/gateway-card/gateway-card.component';

const routes: Routes = [
  {
    path: 'gateways',
    component: GatewaysComponent,
  },
  {
    path: 'gateway/:id',
    component: GatewayCardComponent,
  },
  { path: '', redirectTo: 'gateways', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
