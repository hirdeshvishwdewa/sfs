import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeBarChartComponent } from './realtime-bar-chart.component';

describe('RealtimeBarChartComponent', () => {
  let component: RealtimeBarChartComponent;
  let fixture: ComponentFixture<RealtimeBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealtimeBarChartComponent]
    });
    fixture = TestBed.createComponent(RealtimeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
