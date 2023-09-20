import { atom } from "recoil";
import { CalendarItemT } from "@types/CalendarType";

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

// 선택된 일정 제목
export const selectedCalendarItemTitleState = atom<string>({
  key: "selectedCalendarItemTitle",
  default: "",
})

// 선택된 일정 장소
export const selectedCalendarItemLocState = atom<string>({
  key: "selectedCalendarItemLoc",
  default: "",
})

// 선택된 일정 내용
export const selectedCalendarItemContentState = atom<string>({
  key: "selectedCalendarItemContent",
  default: "",
})