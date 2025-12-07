import { Injectable, signal, computed, inject } from '@angular/core';
import { TimeSlot, CurrentPeriod } from '../models/schedule.models';
import { ThemeService } from './theme.service';
import { TIMETABLE_DATA } from '../data/timetable.data.js';
import { Group, Period, DayOfWeek, ScheduleEntry, ClassDef } from '../models/timetable.schema';
export interface DisplaySlot extends TimeSlot {
  classInfo?: ClassDef;
  room?: string;
  notes?: string;
}

export interface DisplayDay {
  day: string;
  dayNumber: number;
  slots: DisplaySlot[];
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private themeService = inject(ThemeService);
  private timetable = TIMETABLE_DATA;

  private readonly DAY_MAP: Record<DayOfWeek, { hebrew: string; number: number }> = {
    sunday: { hebrew: 'ראשון', number: 0 },
    monday: { hebrew: 'שני', number: 1 },
    tuesday: { hebrew: 'שלישי', number: 2 },
    wednesday: { hebrew: 'רביעי', number: 3 },
    thursday: { hebrew: 'חמישי', number: 4 },
    friday: { hebrew: 'שישי', number: 5 },
    saturday: { hebrew: 'שבת', number: 6 }
  };

  private getGroupData(groupId: string): Group | undefined {
    return this.timetable.groups.find((g: Group) => g.id === groupId);
  }

  private getPeriodFromTemplate(templateId: string, periodId: string): Period | undefined {
    const template = this.timetable.periodTemplates.find((t: any) => t.id === templateId);
    return template?.periods.find((p: Period) => p.id === periodId);
  }

  private buildDisplaySlots(group: Group, daySchedule: { day: DayOfWeek; classes: ScheduleEntry[] }): DisplaySlot[] {
    const slots: DisplaySlot[] = [];
    
    for (const entry of daySchedule.classes) {
      const period = this.getPeriodFromTemplate(group.templateId, entry.periodId);
      const classInfo = this.timetable.classes[entry.classId];
      
      if (period && classInfo) {
        // Check if this is a break period (period ID starts with 'B')
        const isBreak = entry.periodId.startsWith('B') || entry.classId === 'BREAK';
        
        slots.push({
          start: period.start,
          end: period.end,
          isBreak: isBreak,
          label: classInfo.subject,
          classInfo,
          room: entry.room,
          notes: entry.notes
        });
      }
    }
    
    return slots.sort((a, b) => a.start.localeCompare(b.start));
  }

  private getDisplaySchedule(groupId: string): DisplayDay[] {
    const group = this.getGroupData(groupId);
    if (!group) return [];

    return group.week.map(daySchedule => {
      const dayInfo = this.DAY_MAP[daySchedule.day];
      return {
        day: dayInfo.hebrew,
        dayNumber: dayInfo.number,
        slots: this.buildDisplaySlots(group, daySchedule)
      };
    });
  }

  // Old placeholder structure - will be removed
  private readonly OLD_SCHEDULE_DATA_PLACEHOLDER: any[] = [
    {
      day: 'ראשון',
      dayNumber: 0,
      groupA: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '10:10', end: '10:55', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '10:55', end: '12:05', isBreak: false, label: 'מערכות הפעלה' },
        { start: '12:05', end: '12:50', isBreak: false, label: 'מערכות הפעלה' },
        { start: '12:50', end: '13:45', isBreak: false, label: 'הנדסת תוכנה' },
        { start: '13:45', end: '15:15', isBreak: false, label: 'הנדסת תוכנה (המשך)' },
      ],
      groupB: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '10:10', end: '10:55', isBreak: false, label: 'מערכות הפעלה (המשך)' },
        { start: '10:55', end: '12:05', isBreak: false, label: 'מערכות הפעלה' },
        { start: '12:05', end: '12:50', isBreak: false, label: 'מערכות הפעלה' },
        { start: '12:50', end: '13:45', isBreak: false, label: 'הנדסת תוכנה' },
        { start: '13:45', end: '15:15', isBreak: false, label: 'הנדסת תוכנה (המשך)' },
      ],
    },
    {
      day: 'שני',
      dayNumber: 1,
      groupA: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '10:10', end: '11:40', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '11:40', end: '12:05', isBreak: true, label: 'הפסקה' },
        { start: '12:05', end: '12:50', isBreak: false, label: 'סייבר ואבטחת מידע (המשך)' },
        { start: '12:50', end: '15:15', isBreak: false, label: 'סייבר ואבטחת מידע (המשך)' },
      ],
      groupB: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '10:10', end: '11:40', isBreak: false, label: 'אלגברה לינארית (המשך)' },
        { start: '11:40', end: '12:05', isBreak: true, label: 'הפסקה' },
        { start: '12:05', end: '12:50', isBreak: false, label: 'סייבר ואבטחת מידע (המשך)' },
        { start: '12:50', end: '15:15', isBreak: false, label: 'סייבר ואבטחת מידע (המשך)' },
      ],
    },
    {
      day: 'שלישי',
      dayNumber: 2,
      groupA: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'אלגברה לינארית' },
        { start: '09:15', end: '10:00', isBreak: false, label: 'אלגברה לינארית' },
        { start: '10:00', end: '10:10', isBreak: true, label: 'הפסקה' },
        { start: '10:10', end: '13:35', isBreak: false, label: 'טכנולוגיות הנדסת תו' },
      ],
      groupB: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'אלגברה לינארית' },
        { start: '09:15', end: '10:00', isBreak: false, label: 'אלגברה לינארית' },
        { start: '10:00', end: '10:10', isBreak: true, label: 'הפסקה' },
        { start: '10:10', end: '13:35', isBreak: false, label: "מע' מערכות אוטונומי" },
      ],
    },
    {
      day: 'רביעי',
      dayNumber: 3,
      groupA: [
        { start: '08:30', end: '11:40', isBreak: false, label: 'Machine Learning' },
        { start: '11:40', end: '12:05', isBreak: true, label: 'הפסקה' },
        { start: '12:05', end: '15:15', isBreak: false, label: 'תכנות מונחה עצמים' },
        { start: '15:15', end: '17:00', isBreak: false, label: 'טכנולוגיות הנדסת תו' },
      ],
      groupB: [
        { start: '08:30', end: '11:40', isBreak: false, label: 'תכנות מונחה עצמים' },
        { start: '11:40', end: '12:05', isBreak: true, label: 'הפסקה' },
        { start: '12:05', end: '15:15', isBreak: false, label: 'Machine Learning' },
        { start: '15:15', end: '17:00', isBreak: false, label: "מע' מערכות אוטונומי" },
      ],
    },
    {
      day: 'חמישי',
      dayNumber: 4,
      groupA: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'תקשורת נתונים ורשתו (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'תקשורת נתונים ורשתו (המשך)' },
        { start: '10:10', end: '10:55', isBreak: false, label: 'תקשורת נתונים ורשתו' },
        { start: '10:55', end: '13:35', isBreak: false, label: "מע' תקשורת נתונים (המשך)" },
      ],
      groupB: [
        { start: '08:30', end: '09:15', isBreak: false, label: 'תקשורת נתונים ורשתו (המשך)' },
        { start: '09:15', end: '10:10', isBreak: false, label: 'תקשורת נתונים ורשתו (המשך)' },
        { start: '10:10', end: '10:55', isBreak: false, label: 'תקשורת נתונים ורשתו' },
        { start: '10:55', end: '13:35', isBreak: false, label: "מע' תקשורת נתונים (המשך)" },
      ],
    },
  ];

  private readonly QUOTES: string[] = [
    'אני בשירותים (ירדן דרורי)',
    'לא טוב',
    'מוביט זה פרוקסי של איראן',
    'תדליקו את המזגן חם לי',
    'תבורכו!!!',
    'אודיפי',
    'הסוויש הוא שקוף',
    'בכר אתה לא תורם לאנושות',
    'הקרסרים! הם מדברים ביניהם!',
    'לכו תזדיינו - אלי גוריאל',
  ];

  showOnlyToday = signal<boolean>(false);
  selectedGroup = this.themeService.selectedGroup;

  schedule = computed(() => {
    const groupId = this.selectedGroup();
    const displaySchedule = this.getDisplaySchedule(groupId);
    
    if (this.showOnlyToday()) {
      const today = new Date().getDay();
      return displaySchedule.filter(day => day.dayNumber === today);
    }
    return displaySchedule;
  });

  getCurrentPeriod(): CurrentPeriod | null {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const groupId = this.selectedGroup();
    const displaySchedule = this.getDisplaySchedule(groupId);
    const daySchedule = displaySchedule.find(d => d.dayNumber === currentDay);
    
    if (!daySchedule) return null;

    const timeSlots = daySchedule.slots;

    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      if (currentTime >= slot.start && currentTime < slot.end) {
        const endMinutes = this.timeToMinutes(slot.end);
        const currentMinutes = this.timeToMinutes(currentTime);
        const minutesUntilEnd = endMinutes - currentMinutes;

        // Find next break (if any)
        let nextBreak: TimeSlot | undefined;
        let minutesUntilBreak: number | undefined;
        
        for (let j = i + 1; j < timeSlots.length; j++) {
          if (timeSlots[j].isBreak) {
            nextBreak = timeSlots[j];
            const breakStartMinutes = this.timeToMinutes(nextBreak.start);
            minutesUntilBreak = breakStartMinutes - currentMinutes;
            break;
          }
        }

        // If no explicit break, use gap between classes
        if (!nextBreak && i + 1 < timeSlots.length) {
          const nextSlot = timeSlots[i + 1];
          const gapMinutes = this.timeToMinutes(nextSlot.start) - this.timeToMinutes(slot.end);
          if (gapMinutes > 0) {
            nextBreak = {
              start: slot.end,
              end: nextSlot.start,
              isBreak: true,
              label: 'הפסקה'
            };
            minutesUntilBreak = this.timeToMinutes(slot.end) - currentMinutes;
          }
        }

        return {
          timeSlot: slot,
          day: daySchedule.day,
          minutesUntilEnd,
          nextBreak,
          minutesUntilBreak,
        };
      }
    }

    return null;
  }

  getDailyQuote(): string {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return this.QUOTES[dayOfYear % this.QUOTES.length];
  }

  toggleGroup(): void {
    this.themeService.toggleGroup();
  }

  toggleShowOnlyToday(): void {
    this.showOnlyToday.update(v => !v);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
