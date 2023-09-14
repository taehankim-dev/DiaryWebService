import React from 'react';
import CalendarInfo from './calendarInfo/CalendarInfo';
import CalendarWrite from './calendarWrite/CalendarWrite';
import { CalendarLayout } from '@styles/CalendarStyle';
import { PageContainer } from '@styles/PageLayout';

const Calendar : React.FC = () => {              
  return (
    <PageContainer>
      <CalendarLayout>
        <CalendarInfo />
        <CalendarWrite />
      </CalendarLayout>
    </PageContainer>
  )
}

export default Calendar;