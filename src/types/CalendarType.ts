type CalendarItemT = {
  id : string,
  title : string,
  date : {
    nanoseconds : number,
    seconds : number,
  },
  location : string,
  content : string,
}

type SelectedCalendarItemT = {
  title : string,
  location : string,
  contents : string,
}

export type {
  CalendarItemT,
  SelectedCalendarItemT
}