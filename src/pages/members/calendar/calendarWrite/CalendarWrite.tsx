import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { addDoc, collection, db, doc, updateDoc } from '@fb';
import { CalendarWriteTitle } from './CalendarWriteTitle';
import { CalendarWriteDate } from './CalendarWriteDate';
import { CalendarWriteLoc } from './CalendarWriteLoc';
import { CalendarWriteContents } from './CalendarWriteContents';
import { 
  selectedDateState,
  selectedCalendarItemTitleState,
  selectedCalendarItemLocState,
  selectedCalendarItemContentState, 
  selectedCalendarItemId
} from '@states/CalendarState';
import { CalendarContentsWrap, CalendarInfoBtnWrap, CalendarInfoSubjectWrap } from '@styles/CalendarInfoStyle';
import { userInfo } from '@states/UserState';
import { useInitCaledarItem } from '@hooks/useCalendarItem';

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
  const calendarTitle = useRecoilValue(selectedCalendarItemTitleState);
  const calendarLoc = useRecoilValue(selectedCalendarItemLocState);
  const calendarContent = useRecoilValue(selectedCalendarItemContentState);
  const calendarId = useRecoilValue(selectedCalendarItemId);
  const selectedDate = useRecoilValue(selectedDateState);
  const user = useRecoilValue(userInfo);
  const {InitCalendarItem} = useInitCaledarItem();

  // 저장이나 업데이트 이후 메세지 띄우면서 초기화!
  const clearCalendarInfo = useCallback((msg : string) => {
    alert(msg);
    InitCalendarItem();
  }, [InitCalendarItem])

  // 일정 저장.
  const onSubmitCalendarInfo = useCallback(async(e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if(calendarTitle === "") {
      alert("제목을 입력해주세요.")
      return;
    }
    
    const check = confirm("일정을 저장하시겠습니까?");
    if(check){
      if(calendarId === "") {
        await addDoc(collection(db, `${user.uid} calendar`), {
          title : calendarTitle,
          location : calendarLoc,
          date : selectedDate,
          content : calendarContent,
          createDate : selectedDate,
          updateDate : selectedDate,
        });
        clearCalendarInfo("저장되었습니다.");
      } else {
        await updateDoc(doc(db, `${user.uid} calendar`, calendarId), {
          title : calendarTitle,
          location : calendarLoc,
          date : selectedDate,
          content : calendarContent,
          updateDate : new Date(),
        });
        clearCalendarInfo("수정되었습니다.");
      }
    }
    
  }, [calendarContent, calendarId, calendarLoc, calendarTitle, clearCalendarInfo, selectedDate, user.uid])

  // 일정 내용들 초기화 버튼 클릭.
  const onClickReset = useCallback((e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const result = confirm("적으셨던 내용을 지우시겠습니까?");
    if(result) clearCalendarInfo("삭제되었습니다.")
    
  }, [clearCalendarInfo])

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