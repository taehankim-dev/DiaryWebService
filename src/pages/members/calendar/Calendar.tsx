import React, { useState } from 'react';
import CalendarInfo from './CalendarInfo';
import CalendarWrite from './calendarWrite/CalendarWrite';
import { CalendarLayout } from '@styles/CalendarStyle';
import { PageContainer } from '@styles/PageLayout';

const Calendar : React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
                
  return (
    <PageContainer>
      <CalendarLayout>
        <CalendarInfo currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
        />
        <CalendarWrite />
      </CalendarLayout>
    </PageContainer>
  )
}

export default Calendar;