import React from 'react';

interface PropsI {
  title : string,
  setTitle : React.Dispatch<React.SetStateAction<string>>
}

export const CalendarWriteTitle : React.FC<PropsI> = React.memo(({title, setTitle}) => {
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