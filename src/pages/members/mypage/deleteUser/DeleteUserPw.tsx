import React, { useCallback } from 'react';
import { MyPageChangePwArea } from '@styles/MyPageStyle';

interface RenderDelUserPwItemI {
  pw : string,
  setPw : (value : string) => void,
}

export const RenderDelUserPwItem = React.memo<RenderDelUserPwItemI>((
  {pw, setPw}
) => {
  const changeCurPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value)
  }, [setPw])

  return (
    <MyPageChangePwArea>
      <li>
        <label htmlFor='curPw' className='pwInputLabel'>비밀번호 입력</label>
        <input type="password"
                id="curPw"
                className="pwInput" 
                value={pw}
                onChange={changeCurPw} />
      </li>
    </MyPageChangePwArea>
  )
})