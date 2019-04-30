import {Component, Input, OnInit} from '@angular/core';
import {ENTITIES, FORM_ACTIONS} from '../gateways/gateways.component';

@Component({
  selector: 'app-form-gw',
  templateUrl: './form-gw.component.html',
  styleUrls: ['./form-gw.component.scss']
})
export class FormGwComponent implements OnInit {

  @Input() customform;
  @Input() action: FORM_ACTIONS;
  @Input() entity: ENTITIES;
  @Input() dismiss: any;
  @Input() close: any;
  constructor() { }

  ngOnInit() {
  }

}
