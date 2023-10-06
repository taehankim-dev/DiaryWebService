// 기존에 작성했던 calendar cell render 코드

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { debounce } from 'lodash'
import { getDocs, collection, db, query, onSnapshot } from '@fb';
import { selectedDateCalendarInfoState, selectedDateState } from '@states/CalendarState';
import { CalendarBodyWrap } from '@styles/CalendarStyle';

import type { DocumentData } from '@fb';
import type { CalendarItemT } from '@customTypes/CalendarType';

import { userInfo } from '@states/UserState';
import RenderCalendarCell from './NewRenderCell';

export const CalendarCell : React.FC = () => {
  const [data, setData] = useState<DocumentData>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const user = useRecoilValue(userInfo);
  const selectedDate = useRecoilValue(selectedDateState);
  const setSelectedDateCalendarInfo = useSetRecoilState(selectedDateCalendarInfoState);

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
          const calendarData : DocumentData[] = [];
          const querySnapshot = await getDocs(
            query(collection(db, `${user.uid} calendar`))
          )
          querySnapshot.forEach((doc) => calendarData.push({id : doc.id, ...doc.data()}))

          setData(calendarData);
        } catch(err) {
          console.log("Calendar Cell Error :", err)
        }
      }

      getCalendarData();
    }, [user.uid])

    // 일정 변경 감지에 따른 전체 데이터 변경
    useEffect(() => {
      const q = query(collection(db, `${user.uid} calendar`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const calendarData : DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          calendarData.push({id : doc.id, ...doc.data()});
        });
        setData(calendarData);
      })

      return () => {unsubscribe()};
    }, [user.uid]);

    // 전체 데이터 변경에 따른 날짜별 데이터 변경.
    useEffect(() => {
      const unsubscribe = () => {
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

        setSelectedDateCalendarInfo(selectedCalendarData);
      }
      
      unsubscribe();
    }, [data, selectedDate, setSelectedDateCalendarInfo])

    return (
      <CalendarBodyWrap>
        <RenderCalendarCell data={data as CalendarItemT[]} screenWidth={screenWidth}/>
      </CalendarBodyWrap>
    )
}