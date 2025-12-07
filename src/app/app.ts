import { Component, signal } from '@angular/core';
import { Timer } from './components/timer/timer';
import { ScheduleGrid } from './components/schedule-grid/schedule-grid';
import { ScheduleService } from './services/schedule.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [Timer, ScheduleGrid],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  dailyQuote = signal('');

  constructor(
    private scheduleService: ScheduleService,
    public themeService: ThemeService
  ) {
    this.dailyQuote.set(this.scheduleService.getDailyQuote());
  }
}
