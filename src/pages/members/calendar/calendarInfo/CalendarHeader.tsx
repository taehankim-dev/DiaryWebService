import React from "react";
import { Icon } from '@iconify/react'
import { format, addMonths, subMonths } from 'date-fns';
import { CalendarHeader as CalendarHeaderStyle } from "@styles/CalendarStyle";

type PropsT = {
  currentMonth : Date,
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>,
}

export const CalendarHeader : React.FC<PropsT> = ({
  currentMonth, setCurrentMonth
}) => {
  // 이전달
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  //다음달
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  return (
    <CalendarHeaderStyle>
      <div className="col-start">
        <span className="text">
          <span className="month">
              {format(currentMonth, 'M')}월
          </span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className='col-end'>
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </CalendarHeaderStyle>
  )
}