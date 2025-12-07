export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Period {
  id: string;
  name?: string;
  start: string; // HH:MM
  end: string;   // HH:MM
}

export interface PeriodTemplate {
  id: string;
  label: string;
  periods: Period[];
}

export interface ClassDef {
  subject: string;
  teacher: string;
  color: string; // hex color
}

export interface ScheduleEntry {
  periodId: string;
  classId: string;
  room?: string;
  notes?: string;
}

export interface DaySchedule {
  day: DayOfWeek;
  classes: ScheduleEntry[];
}

export interface Group {
  id: string;
  label: string;
  templateId: string;
  applyTemplateToDays?: DayOfWeek[];
  week: DaySchedule[];
}

export interface Timetable {
  version: string;
  periodTemplates: PeriodTemplate[];
  classes: { [classId: string]: ClassDef };
  groups: Group[];
}
