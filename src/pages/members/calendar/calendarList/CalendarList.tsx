import React from "react";
import { useRecoilValue } from "recoil";
import { CalendarListTitle } from "./CalendarListTitle";
import { CalendarListItem } from "./CalendarListItem";
import { selectedDateInfoState } from "@states/CalendarState";
import { CalendarListLayout, CalendarListWrap } from "@styles/CalendarInfoStyle";

export const CalendarList : React.FC = () => {
  const calendarList = useRecoilValue(selectedDateInfoState)


  return (  
    <CalendarListLayout>
      <CalendarListTitle />
      <CalendarListWrap>
        <ul>
          {calendarList.map((listItem, index) => 
              // <div key={item.id}>{idx+1}. {item.title}</div>
              <CalendarListItem key={listItem.id}
                                id={listItem.id}
                                listItem={listItem} 
                                index={index} />
          )}
        </ul>
      </CalendarListWrap>
      
    </CalendarListLayout>
  )
}