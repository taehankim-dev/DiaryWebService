import React from 'react';
import { CalendarInfoSubjectWrap, PlusBtn } from '@styles/CalendarInfoStyle';
import { Icon } from '@iconify/react';

export const CalendarListTitle : React.FC = React.memo(() => {
  return (
    <CalendarInfoSubjectWrap>
      <p>일정 목록</p>
      <PlusBtn><Icon icon="icon-park:plus" /></PlusBtn>
    </CalendarInfoSubjectWrap>
  )
})