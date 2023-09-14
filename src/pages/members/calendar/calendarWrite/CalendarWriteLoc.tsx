import React from "react";

interface PropsI {
  loc : string,
  setLoc : React.Dispatch<React.SetStateAction<string>>
}

export const CalendarWriteLoc : React.FC<PropsI> = React.memo(({loc, setLoc}) => {
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