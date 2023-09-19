import React from "react"
import { useRecoilState } from "recoil";
import { selectedCalendarItemState } from "@states/CalendarState"

export const CalendarWriteContents :React.FC = React.memo(() => {
  const [selectedCalendarItem, setSelectedCalendarItem] = useRecoilState(selectedCalendarItemState);

  const onChangeContents = (e : string) => {
    setSelectedCalendarItem(prev => ({...prev, contents : e}))
  }

  return (
    <div className='infoItemWrap'> 
      <label htmlFor="body" style={{verticalAlign:'top'}}>내용</label>
      <textarea name="body"
                value={selectedCalendarItem.contents}
                placeholder='일정의 내용을 적어주세요.'
                onChange={(e) => {onChangeContents(e.target.value)}} />
    </div>
  )
})