import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayCardComponent } from './gateway-card.component';
import { Injectable, Input} from '@angular/core';
import {FormDevComponent} from '../form-dev/form-dev.component';
import { ReactiveFormsModule} from '@angular/forms';
import {DevicesService} from '../../services/devices.service';
import {GatewaysService} from '../../services/gateways.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('GatewayCardComponent', () => {
  let component: GatewayCardComponent;
  let fixture: ComponentFixture<GatewayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewayCardComponent, FormDevComponent],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, NgbModule.forRoot()],
      providers: [
        DevicesService,
        GatewaysService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '5e8q4e5fds'} }
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive param id from url', () => {
    expect(component.gwId).toBe('5e8q4e5fds');
  });
});
