import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBell } from './alert-bell';

describe('AlertBell', () => {
  let component: AlertBell;
  let fixture: ComponentFixture<AlertBell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertBell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertBell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
