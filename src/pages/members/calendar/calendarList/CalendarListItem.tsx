import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Icon } from '@iconify/react'; 
import { 
  selectedCalendarItemTitleState,
  selectedCalendarItemLocState,
  selectedCalendarItemContentState 
} from '@states/CalendarState';
import { CalendarItemT } from '@types/CalendarType';
import { db, deleteDoc, doc } from '@fb';

type PropsT = {
  id : string,
  listItem : CalendarItemT,
  index : number
}

export const CalendarListItem : React.FC<PropsT> = React.memo(({id, listItem, index}) => {
  const setCalendarTitle = useSetRecoilState(selectedCalendarItemTitleState);
  const setCalendarLoc = useSetRecoilState(selectedCalendarItemLocState);
  const setCalendarContent = useSetRecoilState(selectedCalendarItemContentState);

  // 일정 목록 아이템 수정 버튼 클릭.
  const onClickCalendarItemUpdate = () => {
    setCalendarTitle(listItem.title);
    setCalendarLoc(listItem.location);
    setCalendarContent(listItem.content);
  }

  // 일정 목록 아이템 삭제 버튼 클릭.
  const onClickCalendarItemDel = async() => {
    const check = confirm("해당 일정을 삭제하시겠습니까?");
    if(check){
      try{
        await deleteDoc(doc(db, "calendar", id));
        alert("삭제되었습니다.")
      } catch(err){
        console.log("CalendarListItem onClickCalendarItemDel Error :", err);
      }
    }
    
  }

  return (
    
      <li>
        <div className="list-item-title">
          <span>{index+1}. </span> 
          <span>{listItem.title}</span>
        </div>
        <span>
          <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" 
                color='#8e2eff'
                onClick={onClickCalendarItemUpdate}/>
        </span>
        <span>
          <Icon icon="mdi:delete" 
                color='red'
                onClick={onClickCalendarItemDel}/>
        </span>
      </li>
    
  )
})