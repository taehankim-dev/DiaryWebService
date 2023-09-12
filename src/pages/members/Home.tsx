import React from 'react';
import Calendar from './Calendar';
import { PageContainer } from '@styles/PageLayout';

const memberHome : React.FC = () => {
  return (
    <PageContainer>
      <Calendar />
    </PageContainer>
  )
}

export default memberHome;