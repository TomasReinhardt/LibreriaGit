import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrolleyComponent } from './trolley.component';

describe('TrolleyComponent', () => {
  let component: TrolleyComponent;
  let fixture: ComponentFixture<TrolleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrolleyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrolleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
