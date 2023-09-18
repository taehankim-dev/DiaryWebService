import React from 'react';
import { Icon } from '@iconify/react'; 
import { CalendarItemT } from '@states/CalendarState';

type PropsT = {
  listItem : CalendarItemT,
  index : number
}

export const CalendarListItem : React.FC<PropsT> = React.memo(({listItem, index}) => {
  return (
    <ul>
      <li>
        <span>{index+1}. {listItem.title}</span>
        <span>
          <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" 
                color='#8e2eff'/>
        </span>
        <span>
          <Icon icon="mdi:delete" color='red'/>
        </span>
      </li>
    </ul>
  )
})