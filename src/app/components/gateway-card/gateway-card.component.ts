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
  public devices: Array<any>;

  public action: FORM_ACTIONS;
  public entity: ENTITIES;
  public data;

  public alert: any;

  public dvId: number;
  public modalRef: NgbModalRef;

  public gwId: String;

  constructor(private _gateway: GatewaysService, private _activated: ActivatedRoute, private _modalService: NgbModal,
              private _device: DevicesService) {
    this.gwId = _activated.snapshot.params['id'];
    _gateway.gatewayById(this.gwId).subscribe(
      response => {
        this.gateway = response['result'];
        this.getList(this.gwId);
      },
      error => {
        console.log(error);
      }
    );
    this.data = {gwId: this.gwId};
    this.alert = {
      show: false,
      status: '',
      message: ''
    };
    this.dvId = 0;
  }

  ngOnInit() {
    this.entity = ENTITIES.DEVICE;
  }

  openEdit(content, dvId) {
    this.data['dvId'] = dvId;
    this.action = FORM_ACTIONS.EDIT;
    this.open(content);
  }

  openRemove(content, dvId) {
    this.dvId = dvId;
    this.open(content);
  }

  openAdd(content) {
    this.action = FORM_ACTIONS.ADD;
    this.open(content);
  }

  public closeAlert() {
    this.alert = {
      show: false,
      status: '',
      message: ''
    };
  }

  public removeDevice() {
    this._device.remove(this.dvId).subscribe(
      response => {
        this.dvId = 0;
        const message = response['status'] === 'success' ? 'Device removed successfully' : response['message'];
        this.modalRef.close({action: FORM_ACTIONS.REMOVE, message: message, status: response['status']});
      },
      error => {
        this.modalRef.close({action: FORM_ACTIONS.REMOVE, message: 'Device can\'t be removed', status: 'danger'});
      }
    );
  }

  private getList(gatewayId) {
    this._gateway.deviceList(gatewayId).subscribe(
      resp => {
        this.devices = resp['result'];
      },
      error => console.log(error)
    );
  }
  private open(content) {
    const options: NgbModalOptions = {ariaLabelledBy: 'modal-basic-title'} as NgbModalOptions;
    this.modalRef = this._modalService.open(content, options);
    this.modalRef.result.then((result) => {
      if (result['action'] === FORM_ACTIONS.ADD || result['action'] === FORM_ACTIONS.EDIT || result['action'] === FORM_ACTIONS.REMOVE) {
        this.alert.message = result['message'];
        this.alert.status = result['status'];
        this.alert.show = true;
        if (result['status'] === 'success') {
          this.getList(this.gwId);
        }
      }
    }, (reason) => {
    });
  }

}
