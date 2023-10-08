import React from 'react';
import HomeTitle from './HomeTitle';
import { useScroll } from '@hooks/useScroll';
import calendarSample01 from '@imgs/calendar_sample01.jpg';
import calendarSample02 from '@imgs/calendar_sample02.jpg';
import { ScrollPageSection, ScrollPageWrap, ScrollPageContainer } from '@styles/PageLayout';

const NonMemberHome : React.FC = () => {
  const { scrollY } = useScroll();
  
  return (
    <ScrollPageContainer>
      <ScrollPageWrap $animate={scrollY}>
        <HomeTitle />
        <ScrollPageSection>
          <div className="img-container">
            <div className="img-slider">
              <div className="slide_img">
                <img src={calendarSample01} alt="calendar-sample-img01"/>
                <img src={calendarSample02} alt="calendar-sample-img02"/>
              </div>
            </div>
            
          </div>
          <div className="body-wrap">
            <div className="body-subtitle">
              <span>달력</span>
            </div>
            <div className="body-text">
              <p>저희 페이지에서 사용하실 수 있는 캘린더에요.</p>
              <p>캘린더를 통해서 당신의 일상을 관리해보세요!!</p>
            </div>
          </div>
        </ScrollPageSection>
      </ScrollPageWrap>
        {/*
         */}
      
    </ScrollPageContainer>
  )
}

export default NonMemberHome;