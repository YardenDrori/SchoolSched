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
  minutesUntilDayEnd = signal<number | null>(null);
  isSchoolActive = signal<boolean>(true);
  private intervalId?: number;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.updatePeriod();

    // Poll every 100ms for smooth updates, but the display will only change when seconds change
    this.intervalId = window.setInterval(() => {
      this.updatePeriod();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updatePeriod(): void {
    this.currentPeriod.set(this.scheduleService.getCurrentPeriod());
    this.minutesUntilDayEnd.set(this.scheduleService.getMinutesUntilDayEnd());
    this.isSchoolActive.set(this.scheduleService.isSchoolDayActive());
  }

  formatTime(minutes: number): string {
    const totalSeconds = Math.floor(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${mins}:${String(secs).padStart(2, '0')} דקות`;
  }
}
