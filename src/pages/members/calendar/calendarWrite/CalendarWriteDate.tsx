import React from "react";
import { useRecoilValue } from "recoil";
import { format } from 'date-fns';
import { selectedDateState } from "@states/CalendarState";


export const CalendarWriteDate : React.FC = React.memo(() => {
  const selectedDate = useRecoilValue(selectedDateState);

  return (
    <div className='infoItemWrap'>
      <label htmlFor='calendarDate'>날짜</label>
      <input type="date" 
              name="calendarDate"
              aria-label="calendarDate"
              id="calendarDate"
              value={format(selectedDate, 'yyyy-MM-dd')}
              disabled/>
    </div>
  )
})