import React from "react";
import { CalendarDayWrap } from "@styles/CalendarStyle";

export const CalendarDays = React.memo(() => {
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