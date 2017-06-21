import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CtRegionComponent} from './ct-region.component';

describe('CtRegionComponent', () => {
  let component: CtRegionComponent;
  let fixture: ComponentFixture<CtRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CtRegionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
