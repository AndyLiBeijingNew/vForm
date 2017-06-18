import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastBoardComponent } from './breast-board.component';

describe('BreastBoardComponent', () => {
  let component: BreastBoardComponent;
  let fixture: ComponentFixture<BreastBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreastBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
