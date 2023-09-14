import styled from "@emotion/styled";

// 달력 레이아웃.
export const CalendarLayout = styled.section`
  display: grid;
  height: calc(100vh - 100px);
  margin-top: 80px;
  grid-template-columns: 4fr 1fr;
  @media screen and (max-width:1100px){
    grid-template-columns: 3fr 1.5fr;
  }

  @media screen and (max-width: 700px){
    display: block;
  }
`;

export const CalendarWrap = styled.div`
  @media screen and (max-width: 700px){
    height: 420px;
  }
`

// 달력 헤더 스타일.
export const CalendarHeader = styled.div`
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  .col-start{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    height: 100%;
    margin-left: 1%;
    .text {
      font-size: 1.75em;
      .month{
        margin-right: 5px;
        font-size: 1.6em;
        font-weight: 600;
      }
    }
  }
  .col-end{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: baseline;
    width: 20%;
    svg{
      width: 11%;
      height: fit-content;
      margin-left: 5%;
      color: transparentize(gray, 0.2);
      cursor: pointer;
      &:hover{
        transform: scale(1.15);
        color: #686868;
      }
    }
  } 

  @media screen and (max-width: 700px){
    height: 13%;
    .col-end{
      svg{
        width:20%;
      }
    }
  }
`

// 달력 요일 스타일.
export const CalendarDayWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  font-weight: 600;
  font-size: 1.25em;
  padding: 2px;
  color: #686868;
  .col{
    display: flex;
    flex-dirction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(100% / 7);
    height: 100%;
    padding-left: 1%;
    border-radius: 10px;
    background-color: transparentize(#ebcfc6, 0.6);
    box-sizing: border-box;
    &:first-of-type{
      color:red;
    }
    &:last-child{
      color:blue;
    }
  }
`

// 달력 날짜 스타일.
export const CalendarBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 89%;

  .row{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .col{
      // display: flex;
      width: calc(100% / 7);
      height: 93%;
      padding:4px 1%;
      margin: 8px 0 0 4px;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      border: 0.4px solid gray;
      border-radius: 3px;
      font-size: 1.05rem;
      box-sizing: border-box;
      .not-valid{
        color:#ccc;
      }
      .day{
        display: block;
      }
      img{
        opacity: 0.1;
      }
      &:first-of-type{
        color:red;
      }
      &:last-child{
        color:blue;
      }
    }
    .valid{
      &:hover{
        cursor:pointer;
        transition: 0.2s ease-in-out;
        transform: scale(1.01);
        border: none;
        background: #c4c4c4;
        box-shadow: 1.5px 1.5px 0px 0px #686868, 0.1;
      }
    }
    .selected{
      box-shadow: 1.5px 1.5px 0px 0px #aa5b42, 0.1;
      transform: scale(1.02);
      border: none;
      background: #f3c5b6;
      color: #aa5b42;
      font-weight:600;
    }
  }
`