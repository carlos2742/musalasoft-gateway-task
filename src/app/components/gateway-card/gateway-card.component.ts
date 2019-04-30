import {Component, OnInit} from '@angular/core';
import {GatewaysService} from '../../services/gateways.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';

@Component({
  selector: 'app-gateway-card',
  templateUrl: './gateway-card.component.html',
  styleUrls: ['./gateway-card.component.scss']
})
export class GatewayCardComponent implements OnInit {

  public gateway: any;

  public action: FORM_ACTIONS;
  public entity: ENTITIES;
  public data;

  public showAlert: boolean;
  public alertStatus: String;
  public alertMessage: String;

  constructor(private _gatewayService: GatewaysService, private _activated: ActivatedRoute, private modalService: NgbModal) {
    const id = _activated.snapshot.params['id'];
    this.gateway = _gatewayService.getGatewayById(id);
    this.data = {id: id};
    this.showAlert = false;
  }

  ngOnInit() {
    this.entity = ENTITIES.DEVICE;
  }

  openEdit(content, uid) {
    this.data['uid'] = uid;
    this.action = FORM_ACTIONS.EDIT;
    this.open(content);
  }

  openAdd(content) {
    this.action = FORM_ACTIONS.ADD;
    this.open(content);
  }

  private open(content) {
    const options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'} as NgbModalOptions;
    this.modalService.open(content, options).result.then((result) => {
      if (result['action'] === FORM_ACTIONS.ADD || result['action'] === FORM_ACTIONS.EDIT) {
        this.alertMessage = result['message'];
        this.alertStatus = result['status'];
        this.showAlert = true;
      }
    }, (reason) => {
    });
  }

  closeAlert() {
    this.showAlert = false;
  }

}
