import React from "react";
import { useRecoilState } from "recoil";
import { selectedCalendarItemLocState } from "@states/CalendarState";

export const CalendarWriteLoc : React.FC = React.memo(() => {
  const [calendarLoc, setCalendarLoc] = useRecoilState(selectedCalendarItemLocState);

  const onChangeLoc = (e : string) => {
    setCalendarLoc(e);
  }

  return (
    <div className='infoItemWrap'>
      <label htmlFor='loc'>장소</label>
      <input type="string"
              name="loc"
              value={calendarLoc}
              placeholder='일정 장소를 입력해주세요.'
              spellCheck="false"
              onChange={(e) => {onChangeLoc(e.target.value)}} />
    </div>
  )
})