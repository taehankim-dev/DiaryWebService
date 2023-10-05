import { useSetRecoilState } from 'recoil';

import { 
  selectedCalendarItemTitleState,
  selectedCalendarItemLocState,
  selectedCalendarItemContentState, 
  selectedCalendarItemId
} from '@states/CalendarState';

type CalendarItemT = {
  calendarTitle: string,
  calendarLoc: string, 
  calendarContents: string, 
  calendarId: string,
}

export const useUpdateCalendarItem = () => {
  const setCalendarTitle = useSetRecoilState(selectedCalendarItemTitleState);
  const setCalendarLoc = useSetRecoilState(selectedCalendarItemLocState);
  const setCalendarContent = useSetRecoilState(selectedCalendarItemContentState);
  const setCalendarId = useSetRecoilState(selectedCalendarItemId);

  const UpdateCalenderItem = ({
    calendarTitle, calendarLoc, calendarContents, calendarId
  } : CalendarItemT ) => {
    setCalendarTitle(calendarTitle);
    setCalendarLoc(calendarLoc)
    setCalendarContent(calendarContents)
    setCalendarId(calendarId);
  }

  return { UpdateCalenderItem };
}

// 캘린더 정보 초기화
export const useInitCaledarItem = () => {
  const setCalendarTitle = useSetRecoilState(selectedCalendarItemTitleState);
  const setCalendarLoc = useSetRecoilState(selectedCalendarItemLocState);
  const setCalendarContent = useSetRecoilState(selectedCalendarItemContentState);
  const setCalendarId = useSetRecoilState(selectedCalendarItemId);

  const InitCalendarItem = () => {
    setCalendarTitle("")
    setCalendarLoc("")
    setCalendarContent("")
    setCalendarId("");
  }
  
  return {InitCalendarItem};
}