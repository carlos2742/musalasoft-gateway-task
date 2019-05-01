import {Component, Input, OnInit} from '@angular/core';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';
import {GatewaysService} from '../../services/gateways.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-gw',
  templateUrl: './form-gw.component.html',
  styleUrls: ['./form-gw.component.scss']
})
export class FormGwComponent implements OnInit {

  @Input() entity: ENTITIES;
  @Input() action: FORM_ACTIONS;
  @Input() params: any;
  @Input() modalRef: NgbModalRef;

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
    let serialValue = '';
    let nameValue = '';
    let ipv4Value = '';

    if (this.action === FORM_ACTIONS.EDIT) {
      this.gateway = this._gatewayService.getGatewayById(this.id);
      serialValue = this.gateway.serial;
      nameValue = this.gateway.name;
      ipv4Value = this.gateway.ipv4;
    }

    this.customform = this._formBuilder.group({
      'serial': new FormControl(serialValue, [Validators.required]),
      'name': new FormControl(nameValue, [Validators.required]),
      'ipv4': new FormControl(ipv4Value, [Validators.required, Validators.pattern('^([0-9]{1,3}\\.){3}[0-9]{1,3}$')]),
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
    const response = {action: '', message: '', status: ''};
    if (this.action === FORM_ACTIONS.EDIT) {
      response.action = FORM_ACTIONS.EDIT;
      if (this._gatewayService.edit(this.id, data)) {
        response.message = 'Gateway was updated.';
        response.status = 'success';
      } else {
        response.message = 'Gateway serial must be unique.';
        response.status = 'danger';
      }
    } else {
      response.action = FORM_ACTIONS.ADD;
      if (this._gatewayService.add(data)) {
        response.message = 'Gateway was added successfully.';
        response.status = 'success';
      } else {
        response.message = 'Gateway serial must be unique.';
        response.status = 'danger';
      }
    }
    this.modalRef.close(response);
  }

}
