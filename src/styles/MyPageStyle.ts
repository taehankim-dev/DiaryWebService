import styled from '@emotion/styled';

export const MyPageContainer = styled.div`
  position: relative;
  top: 80px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  padding: 0px 12px;
  box-sizing: border-box;
  font-family: 'omyu';
  background: #e8e8e8;
  .my-page-button{
    display: inline-block;
    min-width: 44px;
    padding: 2px 9px 3px;
    border-radius: 4px;
    border: 1px solid rgba(212,216,229, .5);
    background-color: rgba(212,216,229,.25);
    box-sizing: border-box;
    text-align: center;
    transition: all 0.2s;
    &:hover{
      cursor: pointer;
      background-color: rgb(212,216,229);
    }
  }
`

export const MyPageSubItemBox = styled.div`
  margin-top: 12px;
  width: 40%;
  margin: 12px auto;
  @media screen and (max-width: 1000px){
    width: 80%;
  }
`;

export const MyPageSubItem = styled.div`
  padding: 16px 17px 0;
  border-radius: 12px;
  box-shadow: 2px 2px 14px 0 rgba(0,164, 73,.08);
  border: solid 1px rgba(3,213,128, .8);
  background-color: #fff;
  box-sizing: border-box;
  >ul{
    border-top: 1px solid rgba(220,227,233, .8);
    &:nth-of-type(1){
      border: none;
    }
  }
`

export const MyPageItemArea = styled.ul`
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  padding: 12px 0;
  >li{
    display: table-cell;
    verticla-align: middle;
    font-size: 14px;
    line-height: 16px;
    word-break: break-all;
    .page-list-item-wrap{
      padding: 6px 0;
      .list-item-icon{
        line-height: 24px;
      }
      .list-item-text{
        line-height: 24px;
        word-break: break-all;
        margin-left: 6px;
      }
      .list-item-modifyBtn{
        float:right;
      }


    }
  }
`

export const MyPageSubItemBoxWrap = styled.div`
  padding-bottom: 16px;
  .mypage-sub-item-btn{
    display: flex;
    margin: auto;
    padding: 2px 9px 3px;
    border-radius: 4px;
    border: 1px solid rgba(212,216,229, .5);
    background-color: rgba(212,216,229,.25);
    box-sizing: border-box;
    text-align: center;
    transition: all 0.2s;
    &:hover{
      cursor: pointer;
      background-color: rgb(212,216,229);
    }
  }
  .my-page-changePw-title{
    padding-bottom: 12px;
  }
  .mypage-sub-item-btn-red{
    background: #ff0000;
    >span{
      color: white;
    }
    &:hover{
      font-weight: bold;
      background: #9d0000;
    }
  }
`

export const MyPageChangePwArea = styled.ul`
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  padding: 12px 0;
  &:nth-of-type(1){
    
    border-top: 1px solid rgba(220,227,233, .8);
  }
  >li{
    position: relative;
    display: table-cell;
    font-size: 14px;
    word-break: break-all;
    label{
      position: absolute;
      top: -8px;
      left: 8px;
      display: inline-block;
      background-color:white;
    }
    .pwInput{
      display:inline-block;
      width: 100%;
      border-radius: 4px;
      padding: 6px;
      box-sizing: border-box;
      border: 1px solid #aaa;
    }
    .changePwBtn{
      float: right;
      margin:0px 4px;
    }
  }
`

export const MyPageTextBody = styled.div`
  .my-page-body-title{
    text-align: center;
    font-size: 1.3rem;
    border-bottom: 1px solid rgba(220,227,233, .8);
    padding-bottom: 5px;
  }
  >div{
    text-align: center;
  }
  .my-page-body-notice{
    >p{
      margin: 0;
    }
  }
  .my-page-body-sub-notice{
    >p{
      text-decoration-line: underline;
    }
  }
  .my-page-body-button-box{
    margin-top: 20px;
    >button{
      margin: 0 4px;
    }
  }
  .my-page-body-check-pw{
    >ul{
      display: flex;
      margin: 6px 0 0 auto;
      >li{
        margin: auto;
      }
      label{
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
`