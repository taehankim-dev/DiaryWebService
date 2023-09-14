import styled from "@emotion/styled";

export const CalendarInfoContainer = styled.div`
  font-size: 1.05em;
  padding: 0px 6px;
  margin-left: 6px;
  border: 1px solid #dedede;
  border-radius: 4px;
  >div{
    border: 1px solid #ccc;
    margin: 4px 0;
    border-radius: 4px;
  }
`

export const CalendarListWrap = styled.div`
  
`

// 달력 정보 입력 부분.
export const CalendarContentsWrap = styled.div`
  .infoItemWrap{
    margin: 12px 0;
    label{
      display:inline-block;
      width: 20%;
      margin-right: 3%;
      text-align: center;
    }
    input, textarea{
      width: calc(100% - 23%);
      padding: 6px;
      box-sizing: border-box;
      border-radius: 4px;
      border-color: #ccc;
      border-style: inset;
    }
  }
`

// 달력 일정 입력 타이틀
export const CalendarInfoSubjectWrap = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  box-sizing: border-box;
  p{
    display: inline-flex;
    margin: 10px auto;
    font-size: 1.5em;
    font-weight: 700;
    text-align: center;
    align-items: center;
  }
`

export const CalendarInfoBtnWrap = styled.div`
  margin-bottom: 4px;
  button, input{
    display: inline-block;
    width: calc(50% - 6px);
    height: 30px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    margin: 0 3px;
    font-weight: 600;
    color: white;
    transition:all 0.2s;
    cursor: pointer;
    &:hover{
      font-size: .9em;
    }
  }
  button{
    background-color: red;
    &:hover{
      background-color: #8d0000;
    }
  }
  input{
    background-color: #7373ff;
    &:hover{
      background-color: #2020ff;
    }
  }
`

