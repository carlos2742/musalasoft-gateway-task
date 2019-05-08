import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';
import {DevicesService} from '../../services/devices.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {GatewaysService} from '../../services/gateways.service';

export enum DEVICES_STATUS {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

@Component({
  selector: 'app-form-dev',
  templateUrl: './form-dev.component.html',
  styleUrls: ['./form-dev.component.scss']
})
export class FormDevComponent implements OnInit {

  @Input() entity: ENTITIES;
  @Input() action: FORM_ACTIONS;
  @Input() params: any;
  @Input() modalRef: NgbModalRef;

  public title: String;
  public gwId: String;
  public FORM_ACTION_ENUM;

  public customform;
  public device;

  constructor(private _device: DevicesService, private _gateway: GatewaysService, private _formBuilder: FormBuilder) {
    this.device = null;
    this.FORM_ACTION_ENUM = FORM_ACTIONS;
  }

  ngOnInit() {
    this.title = `${this.action} ${this.entity}`;
    this.gwId = this.params['gwId'];

    if (this.action === FORM_ACTIONS.EDIT) {
      const dvId = this.params['dvId'];
      this._device.deviceById(dvId).subscribe(
        response => {
          this.device = response['result'];
          this.title += ` ${this.device.uid}`;
          this.createForm(this.device.uid, this.device.vendor, this.device.status);
        },
        error => console.log(error)
      );
    } else {
      this.createForm();
    }

  }

  public submit() {
    if (this.customform.invalid) {
      Object.keys(this.customform.controls).forEach(
        field => {
          const control = this.customform.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      return;
    }

    const data = this.customform.value;
    if (this.action === FORM_ACTIONS.EDIT) {
      this.editDevice(this.device['_id'], data);
    } else {
      data['created'] = new Date();
      this.addDevice(this.gwId, data);
    }
  }

  private createForm(uid = '', vendor = '', status = DEVICES_STATUS.ONLINE) {
    this.customform = this._formBuilder.group({
      'uid': new FormControl(uid, [Validators.required, Validators.pattern('^\\d+$')]),
      'vendor': new FormControl(vendor, [Validators.required]),
      'status': new FormControl(status),
    });
  }

  private editDevice(id, data) {
    this._device.edit(id, data).subscribe(
      response => {
        const message = response['status'] === 'success' ? `Device was updated.` : response['message'];
        this.closeModal(FORM_ACTIONS.EDIT, response['status'], message);
      },
      error => {
        this.closeModal(FORM_ACTIONS.EDIT, error['status'], error['message']);
      }
    );
  }

  private addDevice(gatewayId, data) {
    this._gateway.addDevice(gatewayId, data).subscribe(
      response => {
        const message = response['status'] === 'success' ? 'Device was added successfully.' : response['message'];
        this.closeModal(FORM_ACTIONS.ADD, response['status'], message);
      },
      error => {
        this.closeModal(FORM_ACTIONS.ADD, error['status'], error['message']);
      }
    );
  }

  private closeModal(action, status, message) {
    this.modalRef.close({action: action, status: status, message: message});
  }

}
