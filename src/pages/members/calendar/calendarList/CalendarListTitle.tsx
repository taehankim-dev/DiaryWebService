import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { Icon } from '@iconify/react';
import { selectedDateState } from '@states/CalendarState';
import { CalendarInfoSubjectWrap, PlusBtn } from '@styles/CalendarInfoStyle';
import { useInitCaledarItem } from '@hooks/useCalendarItem';

export const CalendarListTitle : React.FC = React.memo(() => {
  const selectedDate = useRecoilValue(selectedDateState);
  const {InitCalendarItem} = useInitCaledarItem();
  
  const onClickCalendarPlusBtn = useCallback(() => {
    InitCalendarItem();
  }, [InitCalendarItem])

  return (
    <CalendarInfoSubjectWrap>
      <p>
        <span>{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</span> 
        <span>일정 목록</span>
      </p>
      <PlusBtn onClick={onClickCalendarPlusBtn}>
        <Icon icon="icon-park:plus" />
      </PlusBtn>
    </CalendarInfoSubjectWrap>
  )
})