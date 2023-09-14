import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { collection, addDoc, db } from '@fb';
import { CalendarWriteTitle } from './CalendarWriteTitle';
import { CalendarWriteDate } from './CalendarWriteDate';
import { CalendarWriteLoc } from './CalendarWriteLoc';
import { CalendarWriteContents } from './CalendarWriteContents';
import { selectedDateState } from '@states/CalendarState';
import { CalendarContentsWrap, CalendarInfoBtnWrap, CalendarInfoSubjectWrap } from '@styles/CalendarInfoStyle';

const CalendarSubject = React.memo(() => {
  return (
    <CalendarInfoSubjectWrap>
      <p>일정 입력</p>
    </CalendarInfoSubjectWrap>
  )
})

const CalendarBtn = React.memo((
  {onClickReset} : {onClickReset : () => void}
) => {
  return(
    <CalendarInfoBtnWrap>
      <button onClick={onClickReset}>초기화</button>
      <input type="submit" value="저장"/>
    </CalendarInfoBtnWrap>
  )
})

const CalendarInfo : React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  const [calendarContents, setCalendarContents] = useState<string>("");
  const selectedDate = useRecoilValue(selectedDateState);

  // 일정 저장.
  const onSubmitCalendarInfo = useCallback(async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if(title === "") {
      alert("제목을 입력해주세요.")
      return;
    }
    
    const check = confirm("일정을 저장하시겠습니까?");
    if(check){
      try{
        await addDoc(collection(db, "calendar"), {
          title : title,
          location : loc,
          date : selectedDate,
          content : calendarContents,
        })

        alert("저장되었습니다.")
      } catch(err){
        console.log("CalendarWrite Error :", err)
      }
    }
    
  }, [calendarContents, loc, selectedDate, title])

  const onClickReset = useCallback(() => {
    const result = confirm("적으셨던 내용을 지우시겠습니까?");
    if(result){
      setTitle("");
      setLoc("");
      setCalendarContents("");
    }
  }, [])

  return (
    <CalendarContentsWrap>
      <form typeof='submit' onSubmit={(e) => {onSubmitCalendarInfo(e)}}>
        <CalendarSubject />
        <CalendarWriteTitle title={title} setTitle={setTitle} />
        <CalendarWriteDate />
        <CalendarWriteLoc loc={loc} setLoc={setLoc}/>
        <CalendarWriteContents calendarContents={calendarContents} setCalendarContents={setCalendarContents}/>
        <CalendarBtn onClickReset={onClickReset}/>
      </form>
    </CalendarContentsWrap>
  )
}

export default CalendarInfo;