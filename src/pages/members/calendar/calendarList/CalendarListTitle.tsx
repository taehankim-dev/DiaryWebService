import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Icon } from '@iconify/react';
import { selectedCalendarItemState, selectedDateState } from '@states/CalendarState';
import { CalendarInfoSubjectWrap, PlusBtn } from '@styles/CalendarInfoStyle';

export const CalendarListTitle : React.FC = React.memo(() => {
  const selectedCalendarItem = useSetRecoilState(selectedCalendarItemState);
  const selectedDate = useRecoilValue(selectedDateState);
  const onClickCalendarPlusBtn = useCallback(() => {
    selectedCalendarItem({
      title : "",
      location : "",
      contents : "",
    })
  }, [selectedCalendarItem])

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