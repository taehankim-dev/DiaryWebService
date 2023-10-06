import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, differenceInDays, isSameMonth, isSameDay } from 'date-fns';
import { Icon } from '@iconify/react';
import { currentMonthState, selectedDateCalendarInfoState, selectedDateState } from '@states/CalendarState';
import type { CalendarItemT } from '@customTypes/CalendarType';
import { useInitCaledarItem } from '@hooks/useCalendarItem';

type PropsT = {
  data: CalendarItemT[];
  screenWidth: number;
};

const RenderCalendarCell: React.FC<PropsT> = ({ data, screenWidth }) => {
  // Recoil 상태 및 훅 사용
  const currentMonth = useRecoilValue(currentMonthState);
  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(endOfMonth(monthStart));
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const selectedDateInfo = useSetRecoilState(selectedDateCalendarInfoState);
  const { InitCalendarItem } = useInitCaledarItem();

  // 날짜 클릭 이벤트 핸들러
  const onClickDate = useCallback((day: Date) => {
    if (currentMonth.getMonth() === day.getMonth() + 1) return;
    if (day.getDate() === selectedDate.getDate()) return;

    // Recoil 상태 업데이트 및 초기화
    setSelectedDate(day);
    InitCalendarItem();

    // 선택된 날짜에 해당하는 캘린더 데이터 필터링
    const selectedCalendarData: CalendarItemT[] = data.filter((item) => {
      const firebaseTime = new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1000000);
      const firebaseDate = new Date(firebaseTime.toDateString());
      return firebaseDate.getFullYear() === day.getFullYear() && firebaseDate.getMonth() === day.getMonth() && firebaseDate.getDate() === day.getDate();
    });

    // Recoil 상태 업데이트
    selectedDateInfo(selectedCalendarData);
  }, [currentMonth, data, selectedDate, selectedDateInfo, setSelectedDate, InitCalendarItem]);

  // 셀 데이터 렌더링 함수
  const renderCellData = (item: CalendarItemT, screenWidth: number, isSameMonth: (dateLeft: Date, dateRight: Date) => boolean) => {
    const firebaseTime = new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1000000);
    const firebaseDate = new Date(firebaseTime.toDateString());
    const cellTitle = truncateTitle(item.title, screenWidth);

    if (!isSameMonth(firebaseDate, monthStart)) {
      // 현재 월과 다르다면 비활성화
      return (
        <div className="cell-title not-valid" key={item.id}>
          {cellTitle}
        </div>
      );
    } else {
      return (
        <div className="cell-title" key={item.id}>
          {cellTitle}
        </div>
      );
    }
  };

  // 나머지 함수들

// 일정 목록 제목 자르기 함수
const truncateTitle = (title: string, screenWidth: number) => {
  let cellTitle = "";
  if(screenWidth <= 500){
    cellTitle = title.length > 4 ? title.slice(0,4) + "..." : title
  } else if(screenWidth > 500 && screenWidth <= 600){
    cellTitle = title.length > 6 ? title.slice(0,6) + "..." : title
  } else if(screenWidth > 600 && screenWidth <= 800){
    cellTitle = title.length > 7 ? title.slice(0,7) + "..." : title
  } else if(screenWidth > 800 && screenWidth <= 1050){
    cellTitle = title.length > 4 ? title.slice(0,4) + "..." : title
  } else if(screenWidth > 1050 && screenWidth <= 1200){
    cellTitle = title.length > 7 ? title.slice(0,7) + "..." : title
  } else if(screenWidth > 1200 && screenWidth <= 1500){
    cellTitle = title.length > 10 ? title.slice(0,10) + "..." : title;
  } else if(screenWidth > 1500 && screenWidth < 1700){
    cellTitle = title.length > 15 ? title.slice(0,15) + "..." : title;
  } else {
    cellTitle = title.length > 18 ? title.slice(0,18) + "..." : title;
  }

  return cellTitle;
};

// 셀 렌더링 함수
const renderCell = (day: Date, formattedDate: string, cellStyle: string, monthStyle: string, cellData: JSX.Element[]) => {
  return (
    <div className={`col cell ${cellStyle}`} key={day.toString()} onClick={() => onClickDate(day)}>
      <span className={monthStyle}>{formattedDate}</span>
      {cellData.length === 0 ? null : (
        <>
          {screenWidth <= 800 && cellData.length >= 4 ? cellData.slice(0, 4) : cellData}
          {screenWidth <= 800 && cellData.length >= 4 && (
            <span className='cell-more'>
              <Icon icon="pepicons-pencil:dots-y" />
            </span>
          )}
        </>
      )}
    </div>
  );
};

// 날짜 셀 생성 함수
const createDayCell = (day: Date) => {
  const formattedDate = format(day, 'd');
  const cellStyle = !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate) ? 'selected' : format(currentMonth, 'M') !== format(day, 'M') ? 'not-valid' : 'valid';
  const monthStyle = format(currentMonth, 'M') !== format(day, 'M') ? 'day not-valid' : 'day';

  // 해당 날짜의 캘린더 데이터 필터링 및 렌더링
  const cellData = data
    .filter((item) => {
      const firebaseTime = new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1000000);
      const firebaseDate = new Date(firebaseTime.toDateString());
      return firebaseDate.getFullYear() === day.getFullYear() && firebaseDate.getMonth() === day.getMonth() && firebaseDate.getDate() === day.getDate();
    })
    .map((item) => renderCellData(item, screenWidth, isSameMonth));

  return renderCell(day, formattedDate, cellStyle, monthStyle, cellData);
};

  // 캘린더 행 생성
  const rows = Array.from({ length: Math.ceil(differenceInDays(endDate, startDate) / 7) }, (_, i) => {
    const startOfWeekDay = addDays(startDate, i * 7);
    return (
      <div className="row" key={startOfWeekDay.toString()}>
        {Array.from({ length: 7 }, (_, j) => addDays(startOfWeekDay, j)).map(createDayCell)}
      </div>
    );
  });

  return rows;
};

export default RenderCalendarCell;
