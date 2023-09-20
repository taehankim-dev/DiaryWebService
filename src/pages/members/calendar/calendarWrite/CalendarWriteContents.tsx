import React from "react"
import { useRecoilState } from "recoil";
import { selectedCalendarItemContentState } from "@states/CalendarState"

export const CalendarWriteContents :React.FC = React.memo(() => {
  const [calendarContent, setCalendarContent] = useRecoilState(selectedCalendarItemContentState);

  const onChangeContents = (e : string) => {
    setCalendarContent(e)
  }

  return (
    <div className='infoItemWrap'> 
      <label htmlFor="body" style={{verticalAlign:'top'}}>내용</label>
      <textarea name="body"
                value={calendarContent}
                placeholder='일정의 내용을 적어주세요.'
                spellCheck="false"
                onChange={(e) => {onChangeContents(e.target.value)}} />
    </div>
  )
})