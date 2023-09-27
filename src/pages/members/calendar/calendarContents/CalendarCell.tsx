import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { debounce } from 'lodash'
import { format, addDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay } from 'date-fns';
import { getDocs, collection, db, query, onSnapshot } from '@fb';
import { Icon } from '@iconify/react';
import { selectedCalendarItemContentState, selectedCalendarItemId, selectedCalendarItemLocState, selectedCalendarItemTitleState, selectedDateInfoState, selectedDateState } from '@states/CalendarState';
import { CalendarBodyWrap } from '@styles/CalendarStyle';

import type { DocumentData } from '@fb';
import type { CalendarItemT } from '@customTypes/CalendarType';

interface PropsI {
  currentMonth : Date, 
}

export const CalendarCell : React.FC<PropsI> = ({ currentMonth }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [data, setData] = useState<DocumentData>([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
    const setCalendarTitle = useSetRecoilState(selectedCalendarItemTitleState);
    const setCalendarLoc = useSetRecoilState(selectedCalendarItemLocState);
    const setCalendarContent = useSetRecoilState(selectedCalendarItemContentState);
    const setCalendarId = useSetRecoilState(selectedCalendarItemId);
    const selectedDateInfo = useSetRecoilState(selectedDateInfoState);

    // 화면 변화 감지
    const handleResize = debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 300);

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }, [handleResize]);

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

    // 날짜 클릭 시, 일정 정보 
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
      // 현재 보고 있는 월과 다른 월이라면 클릭 불가.
      if(currentMonth.getMonth() === day.getMonth() + 1) return;

      setSelectedDate(day);
      setCalendarTitle("");
      setCalendarLoc("");
      setCalendarContent("");
      setCalendarId("");

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

    return <CalendarBodyWrap>{rows}</CalendarBodyWrap>
}