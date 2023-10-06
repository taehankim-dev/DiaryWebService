import { atom } from "recoil";
import { CalendarItemT } from "@customTypes/CalendarType";

export const currentMonthState = atom<Date>({
  key: "currentMonth",
  default : new Date(),
})

// 선택된 날짜.
export const selectedDateState = atom<Date>({
  key: "selectedDate",
  default : new Date(),
})

// 선택된 날짜의 정보
export const selectedDateCalendarInfoState = atom<CalendarItemT[]>({
  key: "selectedDateCalendarInfo",
  default : [],
})

// 선택된 일정 ID, 신규 생성과 업데이트 구분을 위함.
export const selectedCalendarItemId = atom<string>({
  key: 'selectedCalendarId',
  default: ""
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