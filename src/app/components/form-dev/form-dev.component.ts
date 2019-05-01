import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';
import {DevicesService} from '../../services/devices.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private _deviceService: DevicesService, private _formBuilder: FormBuilder) {
    this.device = null;
    this.FORM_ACTION_ENUM = FORM_ACTIONS;
  }

  ngOnInit() {
    this.title = `${this.action} ${this.entity}`;
    this.gwId = this.params['gwId'];
    let statusValue = DEVICES_STATUS.ONLINE;
    let vendorValue = '';
    let uidValue = '';

    if (this.action === FORM_ACTIONS.EDIT) {
      const dvId = this.params['dvId'];
      this.device = this._deviceService.getDeviceByUid(this.gwId, dvId);
      this.title += ` ${this.device.uid}`;
      uidValue = this.device.uid;
      statusValue = this.device.status;
      vendorValue = this.device.vendor;
    }

    this.customform = this._formBuilder.group({
      'uid': new FormControl(uidValue, [Validators.required]),
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
    let response = {action: '', message: '', status: ''};
    if (this.action === FORM_ACTIONS.EDIT) {
      this._deviceService.edit(this.gwId, this.params['dvId'], data);
      response = {action: FORM_ACTIONS.EDIT, message: `Device: ${this.device.uid} was updated.`, status: 'success'};
    } else {
      data['created'] = new Date();
      this._deviceService.add(this.gwId, data);
      response = {action: FORM_ACTIONS.ADD, message: 'Device was added successfully.', status: 'success'};
    }
    this.modalRef.close(response);
  }

}
