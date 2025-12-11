import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { TimeSlot, CurrentPeriod } from '../models/schedule.models';
import { ThemeService } from './theme.service';
import { TIMETABLE_DATA } from '../data/timetable.data';
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
  private readonly SHOW_TODAY_STORAGE_KEY = 'show-only-today';

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
    return this.timetable?.groups?.find((g: Group) => g.id === groupId);
  }

  private getPeriodFromTemplate(templateId: string, periodId: string): Period | undefined {
    const template = this.timetable?.periodTemplates?.find((t: any) => t.id === templateId);
    return template?.periods?.find((p: Period) => p.id === periodId);
  }

  private buildDisplaySlots(group: Group, daySchedule: { day: DayOfWeek; classes: ScheduleEntry[] }): DisplaySlot[] {
    const template = this.timetable?.periodTemplates?.find((t: any) => t.id === group.templateId);
    if (!template) return [];

    // Create a map of scheduled classes by period ID
    const scheduledMap = new Map<string, ScheduleEntry>();
    for (const entry of daySchedule.classes) {
      scheduledMap.set(entry.periodId, entry);
    }

    const slots: DisplaySlot[] = [];

    // Go through all periods in the template to maintain time alignment
    for (const period of template.periods) {
      const entry = scheduledMap.get(period.id);

      if (entry) {
        const classInfo = this.timetable?.classes?.[entry.classId];
        if (classInfo) {
          const isBreak = period.id.startsWith('B') || entry.classId === 'BREAK';

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
      } else {
        // Add empty slot for alignment
        slots.push({
          start: period.start,
          end: period.end,
          isBreak: false,
          label: ''
        });
      }
    }

    return slots;
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

  showOnlyToday = signal<boolean>(this.loadShowOnlyToday());
  selectedGroup = this.themeService.selectedGroup;

  constructor() {
    // Ensure timetable data is loaded
    if (!this.timetable || !this.timetable.classes || !this.timetable.groups) {
      console.error('Timetable data failed to load!', this.timetable);
      this.timetable = TIMETABLE_DATA;
    }

    // Save showOnlyToday to localStorage whenever it changes
    effect(() => {
      const value = this.showOnlyToday();
      localStorage?.setItem(this.SHOW_TODAY_STORAGE_KEY, String(value));
    });
  }

  private loadShowOnlyToday(): boolean {
    if (typeof localStorage === 'undefined') return false;
    const saved = localStorage.getItem(this.SHOW_TODAY_STORAGE_KEY);
    return saved === 'true';
  }

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
    const currentSeconds = now.getSeconds(); // Capture seconds once

    const groupId = this.selectedGroup();
    const displaySchedule = this.getDisplaySchedule(groupId);
    const daySchedule = displaySchedule.find(d => d.dayNumber === currentDay);

    if (!daySchedule) return null;

    const timeSlots = daySchedule.slots;

    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      if (currentTime >= slot.start && currentTime < slot.end) {
        const endSeconds = this.timeStringToSeconds(slot.end);
        const nowTotalSeconds = this.timeStringToSeconds(currentTime) + currentSeconds;
        const secondsUntilEnd = endSeconds - nowTotalSeconds;
        const minutesUntilEnd = secondsUntilEnd / 60;

        // Find next break (if any)
        let nextBreak: TimeSlot | undefined;
        let minutesUntilBreak: number | undefined;

        for (let j = i + 1; j < timeSlots.length; j++) {
          if (timeSlots[j].isBreak) {
            nextBreak = timeSlots[j];
            const breakStartSeconds = this.timeStringToSeconds(nextBreak.start);
            const secondsUntilBreak = breakStartSeconds - nowTotalSeconds;
            minutesUntilBreak = secondsUntilBreak / 60;
            break;
          }
        }

        // If no explicit break, use gap between classes
        if (!nextBreak && i + 1 < timeSlots.length) {
          const nextSlot = timeSlots[i + 1];
          const nextSlotStartSeconds = this.timeStringToSeconds(nextSlot.start);
          const slotEndSeconds = this.timeStringToSeconds(slot.end);
          const gapSeconds = nextSlotStartSeconds - slotEndSeconds;
          if (gapSeconds > 0) {
            nextBreak = {
              start: slot.end,
              end: nextSlot.start,
              isBreak: true,
              label: 'הפסקה'
            };
            const secondsUntilBreak = slotEndSeconds - nowTotalSeconds;
            minutesUntilBreak = secondsUntilBreak / 60;
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

  getSchoolDayEnd(): string | null {
    const now = new Date();
    const currentDay = now.getDay();
    const groupId = this.selectedGroup();
    const displaySchedule = this.getDisplaySchedule(groupId);
    const daySchedule = displaySchedule.find(d => d.dayNumber === currentDay);

    if (!daySchedule) return null;

    // Find the last period with a label (not empty)
    const timeSlots = daySchedule.slots;
    for (let i = timeSlots.length - 1; i >= 0; i--) {
      if (timeSlots[i].label) {
        return timeSlots[i].end;
      }
    }

    return null;
  }

  getMinutesUntilDayEnd(): number | null {
    const dayEnd = this.getSchoolDayEnd();
    if (!dayEnd) return null;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const currentSeconds = now.getSeconds(); // Capture seconds once

    const dayEndSeconds = this.timeStringToSeconds(dayEnd);
    const nowTotalSeconds = this.timeStringToSeconds(currentTime) + currentSeconds;
    const secondsUntilEnd = dayEndSeconds - nowTotalSeconds;

    if (secondsUntilEnd <= 0) return null;

    return secondsUntilEnd / 60;
  }

  isSchoolDayActive(): boolean {
    const currentPeriod = this.getCurrentPeriod();
    const dayEndMinutes = this.getMinutesUntilDayEnd();
    return currentPeriod !== null || (dayEndMinutes !== null && dayEndMinutes > 0);
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

  // Convert HH:MM time string to total seconds from midnight
  private timeStringToSeconds(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  }
}
