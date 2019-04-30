import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gateway-card',
  templateUrl: './gateway-card.component.html',
  styleUrls: ['./gateway-card.component.scss']
})
export class GatewayCardComponent implements OnInit {

  @Input() gateway: any;
  constructor() { }

  ngOnInit() {
  }

}
