import React from 'react';
import Calendar from './calendarContents/Calendar';
import CalendarWrite from './calendarWrite/CalendarWrite';
import { CalendarLayout } from '@styles/CalendarStyle';
import { CalendarInfoContainer } from '@styles/CalendarInfoStyle';
import { PageContainer } from '@styles/PageLayout';
import { CalendarList } from './calendarList/CalendarList';

const CalendarHome : React.FC = () => {              
  return (
    <PageContainer>
      <CalendarLayout>
        <Calendar />
        <CalendarInfoContainer>
          <CalendarList />
          <CalendarWrite />
        </CalendarInfoContainer>
      </CalendarLayout>
    </PageContainer>
  )
}

export default CalendarHome;