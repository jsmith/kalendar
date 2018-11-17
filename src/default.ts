import { Weekday, Month } from 'dayspan';

const ALL = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
  Weekday.SUNDAY,
];

export default [
  {
    data: {
      title: 'Breakfast',
      color: '#2196F3',
      calendar: 'Eating',
    },
    schedule: {
      dayOfWeek: ALL,
      times: [7],
      duration: 30,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'Lunch',
      color: '#3F51B5',
      calendar: 'Eating',
    },
    schedule: {
      dayOfWeek: ALL,
      times: [12],
      duration: 30,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'Supper',
      color: '#4CAF50',
      calendar: 'Eating',
    },
    schedule: {
      dayOfWeek: ALL,
      times: [17],
      duration: 30,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'Exercise',
      color: '#3F51B5',
      calendar: 'Physical Activities',
    },
    schedule: {
      dayOfWeek: [Weekday.MONDAY, Weekday.WEDNESDAY, Weekday.SATURDAY],
      times: [20],
      duration: 90,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'Going Out',
      color: '#99c2ff',
    },
    schedule: {
      dayOfWeek: [Weekday.SATURDAY],
      times: [22],
      duration: 240,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'Weekly Meeting',
      color: '#3F51B5',
    },
    schedule: {
      dayOfWeek: [Weekday.MONDAY],
      times: [9],
      duration: 30,
      durationUnit: 'minutes',
    },
  },
  {
    data: {
      title: 'First Weekend',
      color: '#4CAF50',
    },
    schedule: {
      weekspanOfMonth: [0],
      dayOfWeek: [Weekday.FRIDAY],
      duration: 3,
      durationUnit: 'days',
    },
  },
  {
    data: {
      title: 'End of Month',
      color: '#000000',
    },
    schedule: {
      lastDayOfMonth: [1],
      duration: 1,
      durationUnit: 'hours',
    },
  },
  {
    data: {
      title: 'Mother\'s Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.MAY],
      dayOfWeek: [Weekday.SUNDAY],
      weekspanOfMonth: [1],
    },
  },
  {
    data: {
      title: 'New Year\'s Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.JANUARY],
      dayOfMonth: [1],
    },
  },
  {
    data: {
      title: 'Inauguration Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.JANUARY],
      dayOfMonth: [20],
    },
  },
  {
    data: {
      title: 'Martin Luther King, Jr. Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.JANUARY],
      dayOfWeek: [Weekday.MONDAY],
      weekspanOfMonth: [2],
    },
  },
  {
    data: {
      title: 'George Washington\'s Birthday',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.FEBRUARY],
      dayOfWeek: [Weekday.MONDAY],
      weekspanOfMonth: [2],
    },
  },
  {
    data: {
      title: 'Memorial Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.MAY],
      dayOfWeek: [Weekday.MONDAY],
      lastWeekspanOfMonth: [0],
    },
  },
  {
    data: {
      title: 'Independence Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
        month: [Month.JULY],
        dayOfMonth: [4],
    },
  },
  {
    data: {
      title: 'Labor Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.SEPTEMBER],
      dayOfWeek: [Weekday.MONDAY],
      lastWeekspanOfMonth: [0],
    },
  },
  {
    data: {
      title: 'Columbus Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
        month: [Month.OCTOBER],
        dayOfWeek: [Weekday.MONDAY],
        weekspanOfMonth: [1],
    },
  },
  {
    data: {
        title: 'Veterans Day',
        color: '#2196F3',
        calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.NOVEMBER],
      dayOfMonth: [11],
    },
  },
  {
    data: {
      title: 'Thanksgiving Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
        month: [Month.NOVEMBER],
        dayOfWeek: [Weekday.THURSDAY],
        weekspanOfMonth: [3],
    },
  },
  {
    data: {
      title: 'Christmas Day',
      color: '#2196F3',
      calendar: 'US Holidays',
    },
    schedule: {
      month: [Month.DECEMBER],
      dayOfMonth: [25],
    },
  },
];
