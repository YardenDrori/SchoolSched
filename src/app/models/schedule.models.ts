export type DayOfWeek = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי';

export type Group = 'A' | 'B';

export interface TimeSlot {
  start: string; // HH:MM format
  end: string;   // HH:MM format
  isBreak: boolean;
  label?: string; // "שיעור 1", "הפסקה", etc.
}

export interface DaySchedule {
  day: DayOfWeek;
  dayNumber: number; // 0 = Sunday, 1 = Monday, etc.
  groupA: TimeSlot[];
  groupB: TimeSlot[];
}

export interface CurrentPeriod {
  timeSlot: TimeSlot;
  day: string; // Hebrew day name
  minutesUntilEnd: number;
  nextBreak?: TimeSlot;
  minutesUntilBreak?: number;
}
