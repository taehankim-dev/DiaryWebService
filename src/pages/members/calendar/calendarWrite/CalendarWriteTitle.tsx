import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCalendarItemTitleState } from '@states/CalendarState';

export const CalendarWriteTitle : React.FC = React.memo(() => {
  const [calendarTitle, setCalendarTitle] = useRecoilState(selectedCalendarItemTitleState);
  const onChangeTitle = useCallback((e: string) => {
    setCalendarTitle(e)
  }, [setCalendarTitle])
  return (
    <div className='infoItemWrap'>
      <label htmlFor='title'>제목</label>
      <input type="text" 
              name="title" 
              value={calendarTitle} 
              placeholder='일정의 제목을 입력해주세요.'
              spellCheck="false"
              onChange={(e) => {onChangeTitle(e.target.value)}}/>
    </div>
  )
})