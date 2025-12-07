import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { TimeSlot } from '../../models/schedule.models';

@Component({
  selector: 'app-schedule-grid',
  imports: [],
  templateUrl: './schedule-grid.html',
  styleUrl: './schedule-grid.scss',
})
export class ScheduleGrid implements OnInit, OnDestroy {
  private intervalId?: number;

  schedule: any;
  selectedGroup: any;
  showOnlyToday: any;
  currentTime: any;

  constructor(public scheduleService: ScheduleService) {
    this.schedule = this.scheduleService.schedule;
    this.selectedGroup = this.scheduleService.selectedGroup;
    this.showOnlyToday = this.scheduleService.showOnlyToday;
    
    this.currentTime = computed(() => {
      const period = this.scheduleService.getCurrentPeriod();
      if (!period) return null;
      return {
        day: period.day,
        timeSlot: period.timeSlot,
      };
    });
  }

  ngOnInit(): void {
    // Force update every minute to refresh current time highlighting
    this.intervalId = window.setInterval(() => {
      this.scheduleService.selectedGroup.set(this.scheduleService.selectedGroup());
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getTimeSlotsForDay(dayIndex: number): TimeSlot[] {
    const day = this.schedule()[dayIndex];
    if (!day) return [];
    return day.slots || [];
  }

  isCurrentSlot(dayName: string, slot: TimeSlot): boolean {
    const current = this.currentTime();
    if (!current) return false;
    return current.day === dayName && 
           current.timeSlot.start === slot.start && 
           current.timeSlot.end === slot.end;
  }

  getSlotColor(slot: any): string {
    return slot.classInfo?.color || 'transparent';
  }

  getSlotDetails(slot: any): string {
    const parts = [];
    if (slot.room) parts.push(`חדר ${slot.room}`);
    if (slot.classInfo?.teacher) parts.push(slot.classInfo.teacher);
    if (slot.notes) parts.push(slot.notes);
    return parts.join(' • ');
  }
}
