export type CalendarItemT = {
  id : string,
  title : string,
  date : {
    nanoseconds : number,
    seconds : number,
  },
  location : string,
  content : string,
}

export type SelectedCalendarItemT = {
  title : string,
  location : string,
  contents : string,
}