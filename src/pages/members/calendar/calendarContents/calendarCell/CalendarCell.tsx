import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { debounce } from 'lodash'


import { getDocs, collection, db, query, onSnapshot } from '@fb';
import { selectedDateInfoState, selectedDateState } from '@states/CalendarState';
import { CalendarBodyWrap } from '@styles/CalendarStyle';


import type { DocumentData } from '@fb';
import type { CalendarItemT } from '@customTypes/CalendarType';
import { RenderCalendarCell } from './RenderCell';

export const CalendarCell : React.FC = () => {
  
  const [data, setData] = useState<DocumentData>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectedDate = useRecoilValue(selectedDateState);
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
      if(data.length !== 0){
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
      }
      
    }, [data, selectedDate, selectedDateInfo])

    return (
      <CalendarBodyWrap>
        <RenderCalendarCell data={data} screenWidth={screenWidth}/>
      </CalendarBodyWrap>
    )
}