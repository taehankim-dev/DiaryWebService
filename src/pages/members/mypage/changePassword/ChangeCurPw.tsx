import React, { useCallback } from 'react';
import { MyPageChangePwArea } from '@styles/MyPageStyle';

interface RenderCurPwItemI {
  curPw : string,
  setCurPw : (value : string) => void,
}

export const RenderCurPwItem = React.memo<RenderCurPwItemI>((
  {curPw, setCurPw}
) => {
  const changeCurPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setCurPw(e.target.value)
  }, [setCurPw])

  return (
    <MyPageChangePwArea>
      <li>
        <label htmlFor='curPw' className='pwInputLabel'>현재 비밀번호</label>
        <input type="password"
                id="curPw"
                className="pwInput" 
                value={curPw}
                onChange={changeCurPw} />
      </li>
    </MyPageChangePwArea>
  )
})