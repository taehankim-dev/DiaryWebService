import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, addDoc, db } from '@fb';
import { CalendarWriteTitle } from './CalendarWriteTitle';
import { CalendarWriteDate } from './CalendarWriteDate';
import { CalendarWriteLoc } from './CalendarWriteLoc';
import { CalendarWriteContents } from './CalendarWriteContents';
import { selectedCalendarItemState, selectedDateState } from '@states/CalendarState';
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
  const [calendarItem, setCalendarItem] = useRecoilState(selectedCalendarItemState);
  // const [title, setTitle] = useState<string>(calendarItem.title);
  // const [loc, setLoc] = useState<string>(calendarItem.location);
  // const [calendarContents, setCalendarContents] = useState<string>(calendarItem.contents);
  const selectedDate = useRecoilValue(selectedDateState);

  // 일정 저장.
  const onSubmitCalendarInfo = useCallback(async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if(calendarItem.title === "") {
      alert("제목을 입력해주세요.")
      return;
    }
    
    const check = confirm("일정을 저장하시겠습니까?");
    if(check){
      try{
        await addDoc(collection(db, "calendar"), {
          title : calendarItem.title,
          location : calendarItem.location,
          date : selectedDate,
          content : calendarItem.contents,
        })

        alert("저장되었습니다.")
        // setTitle("");
        // setLoc("");
        // setCalendarContents("");
        setCalendarItem({
          title : "",
          location : "",
          contents : "",
        })
      } catch(err){
        console.log("CalendarWrite Error :", err)
      }
    }
    
  }, [calendarItem.contents, calendarItem.location, calendarItem.title, selectedDate, setCalendarItem])

  const onClickReset = useCallback(() => {
    const result = confirm("적으셨던 내용을 지우시겠습니까?");
    if(result){
      setCalendarItem({title: "", location: "", contents: ""})
    }
  }, [setCalendarItem])

  return (
    <CalendarContentsWrap>
      <form typeof='submit' onSubmit={(e) => {onSubmitCalendarInfo(e)}}>
        <CalendarSubject />
        <CalendarWriteTitle />
        <CalendarWriteDate />
        <CalendarWriteLoc />
        <CalendarWriteContents />
        <CalendarBtn onClickReset={onClickReset}/>
      </form>
    </CalendarContentsWrap>
  )
}

export default CalendarInfo;