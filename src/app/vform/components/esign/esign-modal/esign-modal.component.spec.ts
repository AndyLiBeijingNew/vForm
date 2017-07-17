import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ESignModalComponent } from './esign-modal.component';

describe('ESignModalComponent', () => {
  let component: ESignModalComponent;
  let fixture: ComponentFixture<ESignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ESignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
