import React from "react";
import { useRecoilValue } from "recoil";
import { CalendarListTitle } from "./CalendarListTitle";
import { CalendarListItem } from "./CalendarListItem";
import { selectedDateCalendarInfoState } from "@states/CalendarState";
import { CalendarListLayout, CalendarListWrap } from "@styles/CalendarInfoStyle";

export const CalendarList : React.FC = () => {
  const calendarList = useRecoilValue(selectedDateCalendarInfoState)

  return (  
    <CalendarListLayout>
      <CalendarListTitle />
      <CalendarListWrap>
        <ul>
          {calendarList.map((listItem, index) => 
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