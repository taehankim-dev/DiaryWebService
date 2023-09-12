import React, { useCallback, useState } from 'react';
import { format } from 'date-fns'

import { CalendarInfoBtnWrap, CalendarInfoSubjectWrap, CalendarInfoWrap } from '@styles/CalendarStyle';

type Props = {
  selectedDate : Date,
}

interface CalendarInfoTitleI {
  title : string,
  setTitle : React.Dispatch<React.SetStateAction<string>>
}

type CalendarInfoDateT = {
  selectedDate : Date,
}

interface CalendarInfoLoc {
  loc : string,
  setLoc : React.Dispatch<React.SetStateAction<string>>
}

interface CalendarInfoBodyI {
  calendarBody : string,
  setCalendarBody : React.Dispatch<React.SetStateAction<string>>
}

// 달력의 해당 날짜 정보 입력 - 제목
const CalendarInfoTitle = React.memo(({title, setTitle} : CalendarInfoTitleI) => {
  return (
    <div className='infoItemWrap'>
      <label htmlFor='title'>제목</label>
      <input type="text" 
              name="title" 
              value={title} 
              placeholder='일정의 제목을 입력해주세요.'
              onChange={(e) => {setTitle(e.target.value)}}/>
    </div>
  )
})

// 달력의 해당 날짜 정보 입력 - 날짜
const CalendarInfoDate = React.memo(({selectedDate} : CalendarInfoDateT) => {
  return (
    <div className='infoItemWrap'>
      <label htmlFor='date'>날짜</label>
      <input type="date" 
              name="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              disabled/>
    </div>
  )
})

// 달력의 해당 날짜 정보 입력 - 장소
const CalendarInfoLoc = React.memo(({loc, setLoc} : CalendarInfoLoc) => {
  return (
    <div className='infoItemWrap'>
      <label htmlFor='loc'>장소</label>
      <input type="string"
              name="loc"
              value={loc}
              placeholder='일정 장소를 입력해주세요.'
              onChange={(e) => {setLoc(e.target.value)}} />
    </div>
  )
})

// 달력의 해당 날짜 정보 입력 - 내용
const CalendarInfoBody = React.memo(({calendarBody, setCalendarBody} : CalendarInfoBodyI) => {
  return (
    <div className='infoItemWrap'> 
      <label htmlFor="body" style={{verticalAlign:'top'}}>내용</label>
      <textarea name="body"
                value={calendarBody}
                placeholder='일정의 내용을 적어주세요.'
                onChange={(e) => {setCalendarBody(e.target.value)}} />
    </div>
  )
})

const CalendarInfo : React.FC<Props> = ({selectedDate}) => {
  const [title, setTitle] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  const [calendarBody, setCalendarBody] = useState<string>("");

  const onSubmitCalendarInfo = useCallback((e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    
  }, [])

  const onClickReset = () => {
    setTitle("");
    setLoc("")
    setCalendarBody("")
  }

  return (
    <CalendarInfoWrap>
      <form typeof='submit' onSubmit={(e) => {onSubmitCalendarInfo(e)}}>
        <CalendarInfoSubjectWrap>
          <p>일정 입력</p>
        </CalendarInfoSubjectWrap>
        <CalendarInfoTitle title={title} setTitle={setTitle}/>
        <CalendarInfoDate selectedDate={selectedDate}/>
        <CalendarInfoLoc loc={loc} setLoc={setLoc}/>
        <CalendarInfoBody calendarBody={calendarBody} setCalendarBody={setCalendarBody}/>
        <CalendarInfoBtnWrap>
          <button onClick={onClickReset}>초기화</button>
          <input type="submit" value="저장"/>
        </CalendarInfoBtnWrap>
      </form>
    </CalendarInfoWrap>
  )
}

export default CalendarInfo;