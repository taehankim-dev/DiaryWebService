import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { format, addDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay } from 'date-fns';
import { getDocs, collection, db, query, onSnapshot } from '@fb';
import { selectedDateInfoState, selectedDateState } from '@states/CalendarState';
import { CalendarBodyWrap } from '@styles/CalendarStyle';

import type { DocumentData } from '@fb';
import type { CalendarItemT } from '@types/CalendarType';

interface PropsI {
  currentMonth : Date, 
}

export const CalendarCell : React.FC<PropsI> = ({ currentMonth }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [data, setData] = useState<DocumentData>([]);
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
    const selectedDateInfo = useSetRecoilState(selectedDateInfoState);

    // 달력 정보 가져오기.
    useEffect(() => {
      const getCalendarData = async() => {
        try{
          const querySnapshot = await getDocs(
            query(collection(db, "calendar"))
          )

          const calendarData : DocumentData[] = [];
          
          querySnapshot.forEach((doc) => calendarData.push({id : doc.id, ...doc.data()}))

          setData(calendarData);
        } catch(err) {
          console.log("Calendar Cell Error :", err)
        }
      }

      getCalendarData();
    }, [])

    // 일정 변경 감지에 따른 리렌더링
    useEffect(() => {
      const q = query(collection(db, 'calendar'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const calendarData : DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          calendarData.push({id : doc.id, ...doc.data()});
        });
        setData(calendarData);
      })

      return () => {unsubscribe()};
    }, []);

    useEffect(() => {
      const selectedCalendarData : CalendarItemT[] = [];
      data.forEach((item : CalendarItemT) => {
        const firebaseTime = new Date(
          item.date.seconds * 1000 + item.date.nanoseconds / 1000000
        );

        const firebaseDate = new Date(firebaseTime.toDateString());
        if(firebaseDate.getFullYear() === selectedDate.getFullYear()
            && firebaseDate.getMonth() === selectedDate.getMonth()
            && firebaseDate.getDate() === selectedDate.getDate()) {
              selectedCalendarData.push(item);
        }
      })

      selectedDateInfo(selectedCalendarData);
    }, [data, selectedDate, selectedDateInfo])

    // 날짜 클릭.
    const onClickDate = (day : Date) => {
      setSelectedDate(day);

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
    }

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

        
        data.forEach((item : CalendarItemT) => {
          const firebaseTime = new Date(
            item.date.seconds * 1000 + item.date.nanoseconds / 1000000
          );

          const firebaseDate = new Date(firebaseTime.toDateString());
          if(  firebaseDate.getFullYear() === day.getFullYear()
              && firebaseDate.getMonth() === day.getMonth()
              && firebaseDate.getDate() === day.getDate()) {
            cellData.push(
              <div className="cell-title" key={item.id}>{item.title}</div>
            );
          }
        })

        if(cellData.length === 0){
          days.push(
            <div className={"col cell "+cellStyle} key={day.toString()} onClick={() => onClickDate(tempDay)}>
              <span className={monthStyle}>
                {formattedDate}
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
}