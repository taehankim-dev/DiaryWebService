import React, { useEffect, useState } from 'react';
import { CalendarLayout } from '@styles/CalendarStyle';

const Calendar : React.FC = () => {
  const [curDay, setCurDay] = useState<Date>();
  const [curYear, setCurYear] = useState<number>();
  const [curMonth, setCurMonth] = useState<number>();
  
  // 날짜 구하기.
  useEffect(() => {
    const settingDay = () => {
      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
      const kstGap = 9 * 60 * 60 * 1000;
      const today = new Date(utc + kstGap);

      const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      setCurDay(currentDay);
      setCurYear(currentDay.getFullYear());
      setCurMonth(currentDay.getMonth() + 1);
    }

    settingDay();
  }, [])

  if(!curYear || !curMonth) return <>Loading...</>

  console.log(new Date(curYear, curMonth, 0));

  return(
    <CalendarLayout>
      <div className='calender_nav'>
        <span className="nav-btn go-prev">prev</span>
        <div className="year-month">
          {curYear}년 {curMonth}월
        </div>
        <span className="nav-btn go-next">next</span>
      </div>
      <div className='calender_wrap'>
        <div className='days'>
          <div className='day'>SUN</div>
          <div className='day'>MON</div>
          <div className='day'>TUE</div>
          <div className='day'>WED</div>
          <div className='day'>THU</div>
          <div className='day'>FRI</div>
          <div className='day'>SAT</div>
        </div>
      </div>

    </CalendarLayout>
  )
}

export default Calendar;