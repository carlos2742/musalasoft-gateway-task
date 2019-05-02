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

  constructor(private _gateway: GatewaysService, private _formBuilder: FormBuilder) {
    this.FORM_ACTION_ENUM = FORM_ACTIONS;
  }

  ngOnInit() {
    this.title = `${this.action} ${this.entity}`;
    this.id = this.params['id'];

    if (this.action === FORM_ACTIONS.EDIT) {
      this._gateway.gatewayById(this.id).subscribe(
        response => {
          const gateway = response['result'];
          this.createForm(gateway.serial, gateway.name, gateway.ipv4);
        },
        error => {
          console.log(error);
        }
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
      this.editGateway(this.id, data);
    } else {
      this.addGateway(data);
    }
  }

  private createForm(serial = '', name = '', ipv4 = '') {
    this.customform = this._formBuilder.group({
      'serial': new FormControl(serial, [Validators.required]),
      'name': new FormControl(name, [Validators.required]),
      'ipv4': new FormControl(ipv4, [Validators.required, Validators.pattern('^([0-9]{1,3}\\.){3}[0-9]{1,3}$')]),
    });
  }
  private editGateway(id, data) {
    this._gateway.edit(id, data).subscribe(
      response => {
        const message = response['status'] === 'success' ? 'Gateway was updated.' : response['message'];
        this.closeModal(FORM_ACTIONS.EDIT, response['status'], message);
      },
      error => {
        this.closeModal(FORM_ACTIONS.EDIT, error['status'], error['message']);
      }
    );
  }

  private addGateway(data) {
    this._gateway.add(data).subscribe(
      response => {
        const message = response['status'] === 'success' ? 'Gateway was added successfully.' : response['message'];
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
