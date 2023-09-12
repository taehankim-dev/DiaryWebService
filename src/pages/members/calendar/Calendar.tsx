import React, { useState } from 'react';
import CalendarInfo from './CalendarInfo';
import CalendarWrite from './CalendarWrite';
import { CalendarLayout } from '@styles/CalendarStyle';
import { PageContainer } from '@styles/PageLayout';

const Calendar : React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
                
  return (
    <PageContainer>
      <CalendarLayout>
        <CalendarInfo currentMonth={currentMonth}
                      selectedDate={selectedDate}
                      setCurrentMonth={setCurrentMonth}
                      setSelectedDate={setSelectedDate}
        />
        <CalendarWrite selectedDate={selectedDate}/>
      </CalendarLayout>
    </PageContainer>
  )
}

export default Calendar;