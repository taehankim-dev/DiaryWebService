import React, { useState, useCallback, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import { getAuth, updateProfileService } from "@fb";
import { userInfo } from "@states/UserState";
import { MyPageItemArea, MyPageSubItem } from "@styles/MyPageStyle"

interface initNameItemI {
  displayName : string,
  setChangeActive : (arg : boolean) => void;
}

interface ChangeNickNameItemI {
  nickName: string,
  setNickName : (name: string) => void,
  changeNickName: MouseEventHandler,
  setChangeActive: (arg : boolean) => void,
}

// 초기 닉네임 부분.
const InitNameItem = React.memo<initNameItemI>((
  {displayName, setChangeActive}
) => {
  return(
    <>
      <span className="list-item-text">
        {displayName}
      </span>
      <button className="list-item-modifyBtn"
              onClick={() => {setChangeActive(true)}}>
        수정
      </button>
    </>
  )
})

// 닉네임 수정 버튼 클릭 시
const ChangeNickNameItem = React.memo<ChangeNickNameItemI>((
  {nickName, setNickName, changeNickName, setChangeActive}
) => {
  return (
    <>
      <span className="list-item-text">
        <input type="text"
                value={nickName}
                onChange={(e) => {setNickName(e.target.value)}} />
      </span>
      <button className="list-item-modifyBtn"
              onClick={changeNickName}>
        변경
      </button>
      <button className="list-item-modifyBtn"
              onClick={() => {setChangeActive(false)}}>
        취소
      </button>
    </>
  )
})

export const MyPageMyInfo : React.FC = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [changeActive, setChangeActive] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>(user.displayName);

  // 닉네임 변경.
  const changeNickName = useCallback(async() => {
    try{
      const auth = getAuth();
      if(auth.currentUser) {
        await updateProfileService(auth.currentUser, {displayName : nickName});
        setUser((prev) => {
          return {...prev, displayName : nickName}
        });
      }
      setChangeActive(false);
      alert("닉네임이 변경되었습니다.")
    } catch(err) {
      console.log("MyPageNickName Change Nick Err : ", err);
    }
  }, [nickName, setUser])

  return (
    <MyPageSubItem>
      <div>기본정보</div>
      <MyPageItemArea>
        <li>이메일 : {user.email}</li>
      </MyPageItemArea>
      <MyPageItemArea>
        <li>
          <div className="page-list-item-wrap">
            <span className="list-item-icon">
              닉네임 : 
            </span>
            {!changeActive
              ?
              <InitNameItem displayName={user.displayName} 
                            setChangeActive={setChangeActive} />
              :
              <ChangeNickNameItem nickName={nickName}
                                  setNickName={setNickName}
                                  changeNickName={changeNickName}
                                  setChangeActive={setChangeActive} />
            }
          </div>
        </li>
      </MyPageItemArea>
    </MyPageSubItem>
    
  )
}