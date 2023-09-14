import { atom } from "recoil";

export const selectedDateState = atom({
  key: "selectedDate",
  default : new Date(),
})

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

export const selectedDateInfoState = atom<CalendarItemT[]>({
  key: "selectedCalendarInfo",
  default : [],
})