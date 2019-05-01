import {Component, Input, OnInit} from '@angular/core';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';
import {GatewaysService} from '../../services/gateways.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DEVICES_STATUS} from '../form-dev/form-dev.component';

@Component({
  selector: 'app-form-gw',
  templateUrl: './form-gw.component.html',
  styleUrls: ['./form-gw.component.scss']
})
export class FormGwComponent implements OnInit {

  @Input() entity: ENTITIES;
  @Input() action: FORM_ACTIONS;
  @Input() params: any;
  @Input() dismiss: any;
  @Input() close: any;

  public title: String;
  public id: String;
  public FORM_ACTION_ENUM;

  public customform;
  public gateway;

  constructor(private _gatewayService: GatewaysService, private _formBuilder: FormBuilder) {
    this.gateway = null;
    this.FORM_ACTION_ENUM = FORM_ACTIONS;
  }

  ngOnInit() {
    this.title = `${this.action} ${this.entity}`;
    this.id = this.params['id'];
    let nameValue = '';
    let ipv4Value = '';

    if (this.action === FORM_ACTIONS.EDIT) {
      this.gateway = this._gatewayService.getGatewayById(this.id);
      nameValue = this.gateway.name;
      ipv4Value = this.gateway.ipv4;
    }

    this.customform = this._formBuilder.group({
      'name': new FormControl(nameValue, [Validators.required]),
      'ipv4': new FormControl(ipv4Value, [Validators.required]),
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
      this._gatewayService.editGateway(this.id, data);
      this.close({action: FORM_ACTIONS.EDIT, message: `Gateway was updated.`, status: 'success'});
    } else {
      this._gatewayService.addGateway(data);
      this.close({action: FORM_ACTIONS.ADD, message: 'Gateway was added successfully.', status: 'success'});
    }
  }

}
