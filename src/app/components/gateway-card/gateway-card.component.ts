import {Component, OnInit} from '@angular/core';
import {GatewaysService} from '../../services/gateways.service';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';
import {DevicesService} from '../../services/devices.service';

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

  public dvId: number;
  private gwId: String;
  public modalRef: NgbModalRef;

  constructor(private _gatewayService: GatewaysService, private _activated: ActivatedRoute, private _modalService: NgbModal,
              private _devicesServices: DevicesService) {
    this.gwId = _activated.snapshot.params['id'];
    this.gateway = _gatewayService.getGatewayById(this.gwId);
    this.data = {id: this.gwId};
    this.showAlert = false;
    this.dvId = 0;
  }

  ngOnInit() {
    this.entity = ENTITIES.DEVICE;
  }

  openEdit(content, uid) {
    this.data['uid'] = uid;
    this.action = FORM_ACTIONS.EDIT;
    this.open(content);
  }

  openRemove(content, uid) {
    this.dvId = uid;
    this.open(content);
  }

  openAdd(content) {
    this.action = FORM_ACTIONS.ADD;
    this.open(content);
  }

  private open(content) {
    const options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'} as NgbModalOptions;
    this.modalRef = this._modalService.open(content, options);
    this.modalRef.result.then((result) => {
      if (result['action'] === FORM_ACTIONS.ADD || result['action'] === FORM_ACTIONS.EDIT || result['action'] === FORM_ACTIONS.REMOVE) {
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

  removeDevice() {
    this._devicesServices.remove(this.gwId, this.dvId);
    this.dvId = 0;
    this.modalRef.close({action: FORM_ACTIONS.REMOVE, message: 'Device removed successfully', status: 'success'});
  }

}
