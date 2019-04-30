import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDevComponent } from './form-dev.component';

describe('FormDevComponent', () => {
  let component: FormDevComponent;
  let fixture: ComponentFixture<FormDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
