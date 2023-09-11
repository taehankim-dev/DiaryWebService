import React from 'react';
import { HomeTitle } from './HomeTitle';
import { PageContainer, TextWithLeftImageSection } from '@styles/PageLayout';


const nonMemberHome : React.FC = () => {
  return(
    <PageContainer>
      <HomeTitle />
      <TextWithLeftImageSection>
        <div>
          여기엔 달력 이미지 넣고
        </div>
        <div>
          <h3>달력</h3>
          <div>저희 페이지에서 사용하실 수 있는 달력이에요!</div>
        </div>
      </TextWithLeftImageSection>
    </PageContainer>
  )
}

export default nonMemberHome;