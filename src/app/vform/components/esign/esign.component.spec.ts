import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ESignComponent } from './esign.component';

describe('ESignComponent', () => {
  let component: ESignComponent;
  let fixture: ComponentFixture<ESignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ESignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
