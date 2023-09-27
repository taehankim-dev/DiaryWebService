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
    >form{
      display: inline-grid;
      justify-items: stretch;
      align-items: baseline;
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 800px){
    height: calc(40% - 20px);
    margin-left: 0px;
    margin-top: 20px;
    padding: 0px;
    >div{
      display: block;
      float: left;
      width: calc(50% - 8px);
      height: 98%;
      margin-left: 6px;
      padding: 6px;
      box-sizing: border-box;
    }
  }
`

export const CalendarListLayout = styled.div`
  height: 60%;
`

export const CalendarListWrap = styled.div`
  height: calc(100% - 50px);
  overflow-y : scroll;
  ul{
    width: calc(100% - 14px);
    margin: 6px 0;
    padding: 0;
    padding-left: 4px;
    li{
      display: flex;
      padding: 0;
      align-items: center;
      list-style:none;
      >.list-item-title{
        display: flex;
        width: 100%;
        padding-left:4px;
        cursor: default;
        >span{
          display:inline-flex;
          &:last-of-type{
            width: 90%;
            padding-left: 2px;
          }
        }
      }
      >span{
        cursor: pointer;
        &:first-of-type{
          margin-left:auto;
          margin-right:6px;
        }
        &:hover{
          transition: all 0.2s;
          transform:scale(1.2);
        }
      }
    }
  }
`


export const PlusBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  &:hover{
    svg{
      transition: all 0.3s;
      transform: scale(1.5);
    }
  }
`

// 달력 정보 입력 부분.
export const CalendarContentsWrap = styled.div`
  height: calc(100% - 60% - 18px);
  .infoItemWrap{
    label{
      display:inline-block;
      width: 20%;
      margin-right: 3%;
      text-align: center;
    }
    input, textarea{
      width: calc(100% - 25%);
      padding: 6px;
      box-sizing: border-box;
      border-radius: 4px;
      border-color: #ccc;
      border-style: inset;
    }
    &:nth-of-type(5){
      textarea{
        height: 150px;
        @media screen and (max-width: 800px){
          height: 135px;
        }
        @media screen and (max-height: 900px){
          height: 50px;
        }
      }
    }
  }
`

// 달력 일정 입력 타이틀
export const CalendarInfoSubjectWrap = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 2px solid #ccc;
  box-sizing: border-box;
  p{
    margin: 10px auto;
    font-size: 1.3rem;
    font-weight: 700;
    text-align: center;
    align-items: center;
    >span{
      &:last-of-type{
        font-size: em;
        margin-left:5px;
      }
    }
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

