import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGrid } from './schedule-grid';

describe('ScheduleGrid', () => {
  let component: ScheduleGrid;
  let fixture: ComponentFixture<ScheduleGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
