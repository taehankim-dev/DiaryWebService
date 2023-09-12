import React, { useState } from 'react';
import { Icon } from '@iconify/react'
import { format, addMonths, subMonths, addDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay } from 'date-fns'


import { CalendarBodyWrap, CalendarDayWrap, CalendarHeader, CalendarLayout, CalendarWrap, CalendarWrite } from '@styles/CalendarStyle';

// 달력 헤더
const RenderCalenderHeader = React.memo((
  {currentMonth, prevMonth, nextMonth}
  : {currentMonth : Date, prevMonth : () => void, nextMonth: () => void}
  ) => {
  return (
    <CalendarHeader>
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
    </CalendarHeader>
  )
});

// 달력 요일 부분
const RenderDays = React.memo(() => {
  const days = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'];

  for(let i = 0; i < 7; i++){
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    )
  }

  return <CalendarDayWrap>{days}</CalendarDayWrap>
})

// 달력 날짜 부분 렌더링
const RenderCells = React.memo((
  { currentMonth, selectedDate, onClickDate }
  : { currentMonth : Date, selectedDate : Date, onClickDate : (date : Date) => void}
  ) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while(day <= endDate){
      for(let i = 0; i < 7; i++){
        formattedDate = format(day, 'd');
        const tempDay = day;
        const cellStyle = !isSameMonth(day, monthStart) 
                          ? 'disabled' 
                          : isSameDay(day, selectedDate) 
                          ? 'selected'
                          : format(currentMonth, 'M') !== format(day, 'M')
                          ? 'not-valid'
                          : 'valid' ;
        const monthStyle = format(currentMonth, 'M') !== format(day, 'M')
                           ? 'text not-valid'
                           : ''


        days.push(
          <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
            <span className={monthStyle}>
              {formattedDate}
            </span>
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );

      days = [];
    }

    return <CalendarBodyWrap>{rows}</CalendarBodyWrap>
})

const Calendar : React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 이전달
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  //다음달
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  const onClickDate = (day : Date) => {
    setSelectedDate(day);
  }

  return (
    <CalendarLayout>
      <CalendarWrap>
        <RenderCalenderHeader currentMonth = {currentMonth}
                              prevMonth = {prevMonth}
                              nextMonth = {nextMonth}
        />
        <RenderDays />
        <RenderCells currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onClickDate={onClickDate}
        />
      </CalendarWrap>
      <CalendarWrite>
          1
      </CalendarWrite>
    </CalendarLayout>
  )
}

export default Calendar;