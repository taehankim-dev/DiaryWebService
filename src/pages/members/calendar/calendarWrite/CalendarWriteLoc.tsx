import React from "react";
import { useRecoilState } from "recoil";
import { selectedCalendarItemState } from "@states/CalendarState";

export const CalendarWriteLoc : React.FC = React.memo(() => {
  const [calendarItem, setCalendarItem] = useRecoilState(selectedCalendarItemState);

  const onChangeLoc = (e : string) => {
    setCalendarItem((prev) => ({...prev, location: e}));
  }

  return (
    <div className='infoItemWrap'>
      <label htmlFor='loc'>장소</label>
      <input type="string"
              name="loc"
              value={calendarItem.location}
              placeholder='일정 장소를 입력해주세요.'
              onChange={(e) => {onChangeLoc(e.target.value)}} />
    </div>
  )
})