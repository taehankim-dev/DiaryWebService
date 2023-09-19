import { atom } from "recoil";
import { CalendarItemT, SelectedCalendarItemT } from "@types/CalendarType";

// 선택된 날짜.
export const selectedDateState = atom({
  key: "selectedDate",
  default : new Date(),
})

// 선택된 날짜의 정보
export const selectedDateInfoState = atom<CalendarItemT[]>({
  key: "selectedCalendarInfo",
  default : [],
})

// 선택된 일정.
export const selectedCalendarItemState = atom<SelectedCalendarItemT>({
  key: "selectedCalendarItem",
  default : {
    title : "",
    location : "",
    contents : "",
  }
})

