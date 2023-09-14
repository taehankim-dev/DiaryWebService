import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDays } from './CalendarDays';
import { CalendarCell } from './CalendarCell';
import { CalendarWrap } from '@styles/CalendarStyle';

const Calendar : React.FC= () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  return (
    <CalendarWrap>
      <CalendarHeader currentMonth={currentMonth} 
                      setCurrentMonth={setCurrentMonth}/>
      <CalendarDays />
      <CalendarCell currentMonth={currentMonth} />
    </CalendarWrap>
  )
}

export default Calendar;