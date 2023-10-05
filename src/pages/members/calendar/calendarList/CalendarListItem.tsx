import React from 'react';
import { useRecoilValue } from 'recoil';
import { Icon } from '@iconify/react'; 
import { db, deleteDoc, doc } from '@fb';
import { useInitCaledarItem, useUpdateCalendarItem } from '@hooks/useCalendarItem';
import { CalendarItemT } from '@customTypes/CalendarType';
import { userInfo } from '@states/UserState';

type PropsT = {
  id : string,
  listItem : CalendarItemT,
  index : number
}

export const CalendarListItem : React.FC<PropsT> = React.memo(({id, listItem, index}) => {
  const user = useRecoilValue(userInfo);
  const { InitCalendarItem } = useInitCaledarItem();
  const { UpdateCalenderItem } = useUpdateCalendarItem();

  // 일정 목록 아이템 수정 버튼 클릭.
  const onClickCalendarItemUpdate = () => {
    UpdateCalenderItem({
      calendarTitle: listItem.title,
      calendarLoc: listItem.location,
      calendarContents: listItem.content,
      calendarId: id,
    });
  }

  // 일정 목록 아이템 삭제 버튼 클릭.
  const onClickCalendarItemDel = async() => {
    const check = confirm("해당 일정을 삭제하시겠습니까?");
    if(check){
      try{
        await deleteDoc(doc(db, `${user.uid} calendar`, id));
        InitCalendarItem();
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