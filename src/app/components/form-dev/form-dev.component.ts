import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {GatewaysService} from '../../services/gateways.service';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';

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
  @Input() dismiss: any;
  @Input() close: any;

  public title: String;
  public id: String;
  public FORM_ACTION_ENUM;

  public customform;
  public device;

  constructor(private _gatewayService: GatewaysService, private _formBuilder: FormBuilder) {
    this.device = null;
    this.FORM_ACTION_ENUM = FORM_ACTIONS;
  }

  ngOnInit() {
    this.title = `${this.action} ${this.entity}`;
    this.id = this.params['id'];
    let statusValue = DEVICES_STATUS.ONLINE;
    let vendorValue = '';

    if (this.action === FORM_ACTIONS.EDIT) {
      const uid = this.params['uid'];
      this.title += ` ${uid}`;
      this.device = this._gatewayService.getDeviceByUid(this.id, uid);
      statusValue = this.device.status;
      vendorValue = this.device.vendor;
    }

    this.customform = this._formBuilder.group({
      'vendor': new FormControl(vendorValue, [Validators.required]),
      'status': new FormControl(statusValue),
    });

  }

  submit() {
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
      this._gatewayService.editDevice(this.id, this.params['uid'], data);
      this.close({action: FORM_ACTIONS.EDIT, message: `Device: ${this.device.uid} was updated.`, status: 'success'});
    } else {
      data['created'] = new Date();
      this._gatewayService.addDevice(this.id, data);
      this.close({action: FORM_ACTIONS.ADD, message: 'Device was added successfully.', status: 'success'});
    }
  }

}
