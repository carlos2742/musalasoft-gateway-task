import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGwComponent } from './form-gw.component';

describe('FormGwComponent', () => {
  let component: FormGwComponent;
  let fixture: ComponentFixture<FormGwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
