import React from "react";
import { useRecoilValue } from "recoil";
import { CalendarListWrap } from "@styles/CalendarInfoStyle";
import { selectedDateInfoState } from "@states/CalendarState";

export const CalendarList : React.FC = () => {
  const calendarList = useRecoilValue(selectedDateInfoState)


  return (  
    <CalendarListWrap>
      {calendarList.map((item, idx) => 
          <div key={item.id}>{idx+1}. {item.title}</div>
        )}
    </CalendarListWrap>
  )
}