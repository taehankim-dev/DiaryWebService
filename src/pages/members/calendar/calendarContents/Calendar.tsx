import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDays } from './CalendarDays';
import { CalendarCell } from './calendarCell/CalendarCell';
import { CalendarWrap } from '@styles/CalendarStyle';

const Calendar : React.FC= () => {
  return (
    <CalendarWrap>
      <CalendarHeader />
      <CalendarDays />
      <CalendarCell />
    </CalendarWrap>
  )
}

export default Calendar;