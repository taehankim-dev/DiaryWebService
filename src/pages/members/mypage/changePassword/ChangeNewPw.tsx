import React, { useCallback } from 'react';
import { MyPageChangePwArea } from '@styles/MyPageStyle';

interface RendernewPwItemI {
  newPw : string,
  setNewPw : (value : string) => void, 
}

export const RendernewPwItem = React.memo<RendernewPwItemI>((
  {newPw, setNewPw}
) => {
  const changeNewPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value)
  }, [setNewPw])
  
  return (
    <MyPageChangePwArea>
      <li>
        <label htmlFor='newPw' className='pwInputLabel'>새로운 비밀번호</label>
        <input type="password"
                id="newPw" 
                className="pwInput"
                value={newPw}
                onChange={changeNewPw} />
      </li>
    </MyPageChangePwArea>
  )
})