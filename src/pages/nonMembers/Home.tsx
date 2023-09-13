import React from 'react';
import HomeTitle from './HomeTitle';
import { useScroll } from '@hooks/useScroll';

import { TextWithLeftImageSection, ScrollPageWrap, ScrollPageContainer } from '@styles/PageLayout';

const NonMemberHome : React.FC = () => {
  const { scrollY } = useScroll();
  
  return (
    <ScrollPageContainer>
      <ScrollPageWrap $animate={scrollY}>
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
      </ScrollPageWrap>
        {/*
         */}
      
    </ScrollPageContainer>
  )
}

export default NonMemberHome;