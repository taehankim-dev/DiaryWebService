import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedCalendarItemState } from '@states/CalendarState';

export const CalendarWriteTitle : React.FC = React.memo(() => {
  const [calendarItem, setCalendarItem] = useRecoilState(selectedCalendarItemState);
  const onChangeTitle = (e: string) => {
    setCalendarItem((prev) => ({...prev, title: e}));
  }
  return (
    <div className='infoItemWrap'>
      <label htmlFor='title'>제목</label>
      <input type="text" 
              name="title" 
              value={calendarItem.title} 
              placeholder='일정의 제목을 입력해주세요.'
              onChange={(e) => {onChangeTitle(e.target.value)}}/>
    </div>
  )
})