import { format, addDays } from 'date-fns';
import { isSameMonth, isSameDay } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentMonthState, selectedDateInfoState, selectedDateState } from '@states/CalendarState';

import type { CalendarItemT } from '@customTypes/CalendarType';
import { DocumentData } from 'firebase/firestore';
import { useInitCaledarItem } from '@hooks/useCalendarItem';

type PropsT = {
  data: DocumentData,
  screenWidth: number,
}

export const RenderCalendarCell : React.FC<PropsT> = ({data, screenWidth}) => {
  const currentMonth = useRecoilValue(currentMonthState);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectedDateInfo = useSetRecoilState(selectedDateInfoState);
  const {InitCalendarItem} = useInitCaledarItem();
  
  // 날짜 클릭.
  const onClickDate = useCallback((day : Date) => {
    // 현재 보고 있는 월과 다른 월이라면 클릭 불가.
    if(currentMonth.getMonth() === day.getMonth() + 1) return;

    if(day.getDate() === selectedDate.getDate()) return;

    setSelectedDate(day);
    InitCalendarItem();

    const selectedCalendarData : CalendarItemT[] = [];
    data.forEach((item : CalendarItemT) => {
      const firebaseTime = new Date(
        item.date.seconds * 1000 + item.date.nanoseconds / 1000000
      );

      const firebaseDate = new Date(firebaseTime.toDateString());
      if(  firebaseDate.getFullYear() === day.getFullYear()
          && firebaseDate.getMonth() === day.getMonth()
          && firebaseDate.getDate() === day.getDate()) {
            selectedCalendarData.push(item);
      }
    })

    selectedDateInfo(selectedCalendarData);
  }, [InitCalendarItem, currentMonth, data, selectedDate, selectedDateInfo, setSelectedDate]);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while(day <= endDate){
    for(let i = 0; i < 7; i++){
      const cellData : JSX.Element[] = [];
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
                        ? 'day not-valid'
                        : 'day'

      if(data.length !== 0){
        data.forEach((item : CalendarItemT) => {
          const firebaseTime = new Date(
            item.date.seconds * 1000 + item.date.nanoseconds / 1000000
          );

          const firebaseDate = new Date(firebaseTime.toDateString());
          if(  firebaseDate.getFullYear() === day.getFullYear()
              && firebaseDate.getMonth() === day.getMonth()
              && firebaseDate.getDate() === day.getDate()) {
            
                let cellTitle = "";
                // 화면 사이즈에 따른 일정 목록 제목 자르기.....
                if(screenWidth <= 500){
                  cellTitle = item.title.length > 4 ? item.title.slice(0,4) + "..." : item.title
                } else if(screenWidth > 500 && screenWidth <= 600){
                  cellTitle = item.title.length > 6 ? item.title.slice(0,6) + "..." : item.title
                } else if(screenWidth > 600 && screenWidth <= 800){
                  cellTitle = item.title.length > 7 ? item.title.slice(0,7) + "..." : item.title
                } else if(screenWidth > 800 && screenWidth <= 1050){
                  cellTitle = item.title.length > 4 ? item.title.slice(0,4) + "..." : item.title
                } else if(screenWidth > 1050 && screenWidth <= 1200){
                  cellTitle = item.title.length > 7 ? item.title.slice(0,7) + "..." : item.title
                } else if(screenWidth > 1200 && screenWidth <= 1500){
                  cellTitle = item.title.length > 10 ? item.title.slice(0,10) + "..." : item.title;
                } else if(screenWidth > 1500 && screenWidth < 1700){
                  cellTitle = item.title.length > 15 ? item.title.slice(0,15) + "..." : item.title;
                } else {
                  cellTitle = item.title.length > 18 ? item.title.slice(0,18) + "..." : item.title;
                }
            
            // 현재 월과 다르다면 비활성화
            if(!isSameMonth(day, monthStart)){
              cellData.push(
                <div className="cell-title not-valid" key={item.id}>
                  {cellTitle}
                </div>
              )
            } else {
              cellData.push(
                <div className="cell-title" key={item.id}>
                  {cellTitle}
                </div>
              )
            }
          }
        })
      }
      
      if(cellData.length === 0){
        days.push(
          <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
            <span className={monthStyle}>
              {formattedDate}
            </span>
          </div>
        );
      } else {
        //화면 사이즈 800 이하
        if(screenWidth <= 800) {
          if(cellData.length >= 4){
            days.push(
              <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
                <span className={monthStyle}>
                  {formattedDate}
                </span>
                {cellData.slice(0, 4)}
                <span className='cell-more'>
                  <Icon icon="pepicons-pencil:dots-y" />
                </span>
              </div>
            );
          } else {
            days.push(
              <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
                <span className={monthStyle}>
                  {formattedDate}
                </span>
                {cellData}
              </div>
            );
          }
        } else {
          // 화면 사이즈 800 보다 클때
          if(cellData.length >= 6){
            days.push(
              <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
                <span className={monthStyle}>
                  {formattedDate}
                </span>
                {cellData.slice(0, 6)}
                <span className='cell-more'>
                  <Icon icon="pepicons-pencil:dots-y" />
                </span>
              </div>
            );
          } else {
            days.push(
              <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
                <span className={monthStyle}>
                  {formattedDate}
                </span>
                {cellData}
              </div>
            );
          }
        }
      }

      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.toString()}>
        {days}
      </div>
    );

    days = [];
  }

  return rows;
}