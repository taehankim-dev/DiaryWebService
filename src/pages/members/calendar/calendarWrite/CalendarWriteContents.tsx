import React from "react"

interface PropsI {
  calendarContents : string,
  setCalendarContents : React.Dispatch<React.SetStateAction<string>>
}

export const CalendarWriteContents :React.FC<PropsI> = React.memo(({calendarContents, setCalendarContents}) => {
  return (
    <div className='infoItemWrap'> 
      <label htmlFor="body" style={{verticalAlign:'top'}}>내용</label>
      <textarea name="body"
                value={calendarContents}
                placeholder='일정의 내용을 적어주세요.'
                onChange={(e) => {setCalendarContents(e.target.value)}} />
    </div>
  )
})