import { Timetable } from '../models/timetable.schema';

export const TIMETABLE_DATA: Timetable = {
  version: "2.0",
  
  periodTemplates: [
    {
      id: "std",
      label: "Standard Day",
      periods: [
        { id: "P1", name: "Period 1", start: "08:30", end: "09:15" },
        { id: "P2", name: "Period 2", start: "09:15", end: "10:00" },
        { id: "B1", name: "Break 1", start: "10:00", end: "10:10" },
        { id: "P3", name: "Period 3", start: "10:10", end: "10:55" },
        { id: "P4", name: "Period 4", start: "10:55", end: "11:40" },
        { id: "B2", name: "Break 2", start: "11:40", end: "12:05" },
        { id: "P5", name: "Period 5", start: "12:05", end: "12:50" },
        { id: "P6", name: "Period 6", start: "12:50", end: "13:35" },
        { id: "B3", name: "Break 3", start: "13:35", end: "13:45" },
        { id: "P7", name: "Period 7", start: "13:45", end: "14:30" },
        { id: "P8", name: "Period 8", start: "14:30", end: "15:15" },
        { id: "P9", name: "Period 9", start: "15:15", end: "16:00" },
        { id: "B4", name: "Break 4", start: "16:00", end: "16:10" },
        { id: "P10", name: "Period 10", start: "16:10", end: "17:00" }
      ]
    }
  ],

  classes: {
    "ALGB": {
      subject: "אלגברה לינארית",
      teacher: "פיש אירן",
      color: "#DBB124"
    },
    "SYS": {
      subject: "מערכות הפעלה",
      teacher: "קובל שאול",
      color: "#5b6cc7"
    },
    "SE": {
      subject: "הנדסת תוכנה",
      teacher: "אוסטריצב איר",
      color: "#C6C476"
    },
    "CYBER": {
      subject: "סייבר",
      teacher: "גוריאל אלי",
      color: "#f5673b"
    },
    "EMBEDDED": {
      subject: "מערכות אוטונומיות",
      teacher: "רפאלי יקיר",
      color: "#65DA80"
    },
    "WEB": {
      subject: "ווב",
      teacher: "עמיר אסף",
      color: "#009688"
    },
    "AI": {
      subject: "למידת מכונה",
      teacher: "וינברגר אפרת",
      color: "#43A047"
    },
    "OOP": {
      subject: "מונחה עצמים",
      teacher: "גוריאל אלי",
      color: "#e07272"
    },
    "NETWORKS": {
      subject: "תקשורת מחשבים",
      teacher: "גורן קובי",
      color: "#50ABDC"
    },
    "BREAK": {
      subject: "הפסקה",
      teacher: "",
      color: "#59C9A5"
    },
    "BaseFood": {
      subject: "אוכל בסיס",
      teacher: "",
      color: "#CE84AD"
    }
  },

  groups: [
    {
      id: "A",
      label: "Group A",
      templateId: "std",
      applyTemplateToDays: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ],
      week: [
        {
          day: "sunday",
          classes: [
            { periodId: "P1", classId: "SYS", room: "4009" },
            { periodId: "P2", classId: "SYS", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "SYS", room: "4009" },
            { periodId: "P4", classId: "SYS", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "SYS", room: "4009" },
            { periodId: "P6", classId: "SE", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "SE", room: "4009" },
            { periodId: "P8", classId: "SE", room: "4009" }
          ]
        },
        {
          day: "monday",
          classes: [
            { periodId: "P1", classId: "ALGB", room: "4009" },
            { periodId: "P2", classId: "ALGB", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "ALGB", room: "4009" },
            { periodId: "P4", classId: "ALGB", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "CYBER", room: "4009" },
            { periodId: "P6", classId: "CYBER", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "CYBER", room: "4009" },
            { periodId: "P8", classId: "CYBER", room: "4009" }
          ]
        },
        {
          day: "tuesday",
          classes: [
            { periodId: "B2", classId: "BaseFood", room: "Tzrifin 108" }
          ]
        },
        {
          day: "wednesday",
          classes: [
            { periodId: "P1", classId: "ALGB", room: "4009" },
            { periodId: "P2", classId: "ALGB", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "EMBEDDED", room: "4106" },
            { periodId: "P4", classId: "EMBEDDED", room: "4106" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "EMBEDDED", room: "4106" },
            { periodId: "P6", classId: "EMBEDDED", room: "4106" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "WEB", room: "4009" },
            { periodId: "P8", classId: "WEB", room: "4009" },
            { periodId: "P9", classId: "WEB", room: "4009" },
            { periodId: "B4", classId: "BREAK" },
            { periodId: "P10", classId: "WEB", room: "4009" }
          ]
        },
        {
          day: "thursday",
          classes: [
            { periodId: "P1", classId: "AI", room: "4011" },
            { periodId: "P2", classId: "AI", room: "4011" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "AI", room: "4011" },
            { periodId: "P4", classId: "AI", room: "4011" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "OOP", room: "4009" },
            { periodId: "P6", classId: "OOP", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "OOP", room: "4009" },
            { periodId: "P8", classId: "OOP", room: "4009" }
          ]
        },
        {
          day: "friday",
          classes: [
            { periodId: "P1", classId: "NETWORKS", room: "4009" },
            { periodId: "P2", classId: "NETWORKS", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "NETWORKS", room: "4009" },
            { periodId: "P4", classId: "NETWORKS", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "NETWORKS", room: "4009" },
            { periodId: "P6", classId: "NETWORKS", room: "4009" }
          ]
        }
      ]
    },
    {
      id: "B",
      label: "Group B",
      templateId: "std",
      applyTemplateToDays: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ],
      week: [
        {
          day: "sunday",
          classes: [
            { periodId: "P1", classId: "SYS", room: "4009" },
            { periodId: "P2", classId: "SYS", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "SYS", room: "4009" },
            { periodId: "P4", classId: "SYS", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "SYS", room: "4009" },
            { periodId: "P6", classId: "SE", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "SE", room: "4009" },
            { periodId: "P8", classId: "SE", room: "4009" }
          ]
        },
        {
          day: "monday",
          classes: [
            { periodId: "P1", classId: "ALGB", room: "4009" },
            { periodId: "P2", classId: "ALGB", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "ALGB", room: "4009" },
            { periodId: "P4", classId: "ALGB", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "CYBER", room: "4009" },
            { periodId: "P6", classId: "CYBER", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "CYBER", room: "4009" },
            { periodId: "P8", classId: "CYBER", room: "4009" }
          ]
        },
        {
          day: "tuesday",
          classes: [
            { periodId: "B2", classId: "BaseFood", room: "Tzrifin 108" }
          ]
        },
        {
          day: "wednesday",
          classes: [
            { periodId: "P1", classId: "ALGB", room: "4009" },
            { periodId: "P2", classId: "ALGB", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "WEB", room: "4009" },
            { periodId: "P4", classId: "WEB", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "WEB", room: "4009" },
            { periodId: "P6", classId: "WEB", room: "4009" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "EMBEDDED", room: "4106" },
            { periodId: "P8", classId: "EMBEDDED", room: "4106" },
            { periodId: "P9", classId: "EMBEDDED", room: "4106" },
            { periodId: "B4", classId: "BREAK" },
            { periodId: "P10", classId: "EMBEDDED", room: "4106" }
          ]
        },
        {
          day: "thursday",
          classes: [
            { periodId: "P1", classId: "OOP", room: "4009" },
            { periodId: "P2", classId: "OOP", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "OOP", room: "4009" },
            { periodId: "P4", classId: "OOP", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "AI", room: "4106" },
            { periodId: "P6", classId: "AI", room: "4106" },
            { periodId: "B3", classId: "BREAK" },
            { periodId: "P7", classId: "AI", room: "4106" },
            { periodId: "P8", classId: "AI", room: "4106" }
          ]
        },
        {
          day: "friday",
          classes: [
            { periodId: "P1", classId: "NETWORKS", room: "4009" },
            { periodId: "P2", classId: "NETWORKS", room: "4009" },
            { periodId: "B1", classId: "BREAK" },
            { periodId: "P3", classId: "NETWORKS", room: "4009" },
            { periodId: "P4", classId: "NETWORKS", room: "4009" },
            { periodId: "B2", classId: "BREAK" },
            { periodId: "P5", classId: "NETWORKS", room: "4009" },
            { periodId: "P6", classId: "NETWORKS", room: "4009" }
          ]
        }
      ]
    }
  ]
};
