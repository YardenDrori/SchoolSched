import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { CurrentPeriod } from '../../models/schedule.models';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer implements OnInit, OnDestroy {
  currentPeriod = signal<CurrentPeriod | null>(null);
  private intervalId?: number;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.updatePeriod();
    this.intervalId = window.setInterval(() => {
      this.updatePeriod();
    }, 10000); // Update every 10 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updatePeriod(): void {
    this.currentPeriod.set(this.scheduleService.getCurrentPeriod());
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}`;
    }
    return `${mins} דקות`;
  }
}
