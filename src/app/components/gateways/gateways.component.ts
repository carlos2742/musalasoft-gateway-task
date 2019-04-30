import { Component, OnInit } from '@angular/core';
import {GatewaysService} from '../../services/gateways.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {

  public gateways: Array<any>;
  constructor(private _gatewayService: GatewaysService, private modalService: NgbModal) {
    this.gateways = _gatewayService.list;
  }

  ngOnInit() {
  }

  open(content) {
    const options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'} as NgbModalOptions;
    this.modalService.open(content, options).result.then((result) => {
    }, (reason) => {
    });
  }

}
