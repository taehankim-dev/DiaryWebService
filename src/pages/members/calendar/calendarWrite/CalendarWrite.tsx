import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, addDoc, db } from '@fb';
import { CalendarWriteTitle } from './CalendarWriteTitle';
import { CalendarWriteDate } from './CalendarWriteDate';
import { CalendarWriteLoc } from './CalendarWriteLoc';
import { CalendarWriteContents } from './CalendarWriteContents';
import { 
  selectedDateState,
  selectedCalendarItemTitleState,
  selectedCalendarItemLocState,
  selectedCalendarItemContentState 
} from '@states/CalendarState';
import { CalendarContentsWrap, CalendarInfoBtnWrap, CalendarInfoSubjectWrap } from '@styles/CalendarInfoStyle';

const CalendarSubject = React.memo(() => {
  return (
    <CalendarInfoSubjectWrap>
      <p>일정 입력</p>
    </CalendarInfoSubjectWrap>
  )
})

const CalendarBtn = React.memo((
  {onClickReset} : {onClickReset : (e : React.MouseEvent<HTMLElement>) => void}
) => {
  return(
    <CalendarInfoBtnWrap>
      <button onClick={onClickReset}>초기화</button>
      <input type="submit" value="저장"/>
    </CalendarInfoBtnWrap>
  )
})

const CalendarInfo : React.FC = () => {
  const [calendarTitle, setCalendarTitle] = useRecoilState(selectedCalendarItemTitleState);
  const [calendarLoc, setCalendarLoc] = useRecoilState(selectedCalendarItemLocState);
  const [calendarContent, setCalendarContent] = useRecoilState(selectedCalendarItemContentState);
  const selectedDate = useRecoilValue(selectedDateState);

  // 일정 저장.
  const onSubmitCalendarInfo = useCallback(async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if(calendarTitle === "") {
      alert("제목을 입력해주세요.")
      return;
    }
    
    const check = confirm("일정을 저장하시겠습니까?");
    if(check){
      try{
        await addDoc(collection(db, "calendar"), {
          title : calendarTitle,
          location : calendarLoc,
          date : selectedDate,
          content : calendarContent,
        })

        alert("저장되었습니다.")
        setCalendarTitle("");
        setCalendarLoc("");
        setCalendarContent("");
      } catch(err){
        console.log("CalendarWrite Error :", err)
      }
    }
    
  }, [calendarContent, calendarLoc, calendarTitle, selectedDate, setCalendarContent, setCalendarLoc, setCalendarTitle])

  const onClickReset = useCallback((e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const result = confirm("적으셨던 내용을 지우시겠습니까?");
    if(result){
      setCalendarTitle("")
      setCalendarLoc("")
      setCalendarContent("")
    }
  }, [setCalendarContent, setCalendarLoc, setCalendarTitle])

  return (
    <CalendarContentsWrap>
      <form typeof='submit' onSubmit={(e) => {onSubmitCalendarInfo(e)}}>
        <CalendarSubject />
        <CalendarWriteTitle />
        <CalendarWriteDate />
        <CalendarWriteLoc />
        <CalendarWriteContents />
        <CalendarBtn onClickReset={(e) => onClickReset(e)}/>
      </form>
    </CalendarContentsWrap>
  )
}

export default CalendarInfo;