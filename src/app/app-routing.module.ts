import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DevicesComponent} from './components/devices/devices.component';
import {GatewaysComponent} from './components/gateways/gateways.component';

const routes: Routes = [
  {
    path: 'gateways',
    component: GatewaysComponent,
  }, {
    path: 'devices',
    component: DevicesComponent,
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
