import { atom } from "recoil";

export const selectedDateState = atom({
  key: "selectedDate",
  default : new Date(),
})