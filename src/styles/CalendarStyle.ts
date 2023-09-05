import styled from "@emotion/styled";

export const CalendarLayout = styled.div`
  display: block;

  .calender_nav {
    display: flex;
    justify-content: center;
    align-items: center;

    .nav{
      display: flex;
      border: 1px solid #333;
      border-radius: 5px;
    }

    .nav-btn{
      display: flex;
      width:50px;
      height: 80px;
      font-size: 0;
      justify-content: center;
      align-items: center;
      &:before{
        content: "";
        display: block;
        width: 30px;
        height: 30px;
        border: 6px solid #000;
        border-width: 6px 6px 0 0;
        transition: border 0.1s;
        &:hover{
          border-color: #ed2a61;
        }
      }
    }

    .go-prev:before{
      transform: rotate(-135deg);
    }

    .go-next:before{
      transform:rotate(45deg);
    }
    
    .year-month{
      text-align: center;
      font-size: 2em;
    }
  }

  .calender_wrap{
    position: relative;
    padding-top: 40px;
    margin: 0 auto;
    .days{
      display: flex;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #dd;
      .day{
        width: calc(100% / 7);
        color: #515151;
        text-align: center;
        font-size: 1.5em;
        &:nth-of-type(7n){
          color: #3c6ffa;
        }
        &:nth-of-type(7n - 6){
          color: #ed2a61;
        }
      }
    }
    &:after{
      top: 368px;
    }
  }
`

