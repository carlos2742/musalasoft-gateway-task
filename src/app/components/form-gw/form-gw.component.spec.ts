import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGwComponent } from './form-gw.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GatewaysService} from '../../services/gateways.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FormGwComponent', () => {
  let component: FormGwComponent;
  let fixture: ComponentFixture<FormGwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGwComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [GatewaysService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGwComponent);
    component = fixture.componentInstance;
    component.params = {'id': '5e8q4e5fds'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id from @input params', () => {
    expect(component.id).toBe('5e8q4e5fds');
  });
});
