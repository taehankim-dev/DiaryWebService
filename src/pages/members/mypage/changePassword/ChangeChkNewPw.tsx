import React, { useCallback } from 'react';
import { MyPageChangePwArea } from '@styles/MyPageStyle';

interface RenderChknewPwItemI {
  chknewPw : string,
  setChkNewPw : (value : string) => void,
}

export const RenderChknewPwItem = React.memo<RenderChknewPwItemI>((
  {chknewPw, setChkNewPw}
) => {
  const changeChkNewPw = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setChkNewPw(e.target.value)
  }, [setChkNewPw])

  return(
    <MyPageChangePwArea>
      <li>
        <label htmlFor='newPwChk' className='pwInputLabel'>새로운 비밀번호 확인</label>
        <input type="password"
                id="newPwChk" 
                className="pwInput"
                value={chknewPw}
                onChange={changeChkNewPw} />
      </li>
    </MyPageChangePwArea>
  )
})