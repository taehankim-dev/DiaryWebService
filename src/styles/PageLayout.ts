import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const PageContainer = styled.article`
  display:grid;
  height: 100vh;
  padding:12px;
  box-sizing:border-box;
  font-family: 'omyu';
  overflow: hidden;
  >div{
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
  } 
`

export const ScrollPageContainer = styled.article`
  height: 100vh;
  font-family: 'omyu';
  overflow: hidden;
`

export const ScrollPageWrap = styled.div<{ $animate: number; }>`
  position: relative;
  height:200%;
  top: ${props => props.$animate > 0 ? props.$animate * (-1) : 0}%;
  transition: all 1.5s;
  >section{
    display: flex;
    height: 50%;
    align-items: center;
    justify-content: center;
  }
`

export const TitleSection = styled.section`
  text-align: center;
`

const slideAni = keyframes`
  0%{
    left: 0%;
    opacity: 1;
  }

  47%{
    left: 0%;
    opacity: 0;
  }

  53%{
    left: -100%;
    opacity: 0;
  }

  100% {
    left: -100%;
    opacity: 1;
  }
`

export const ScrollPageSection = styled.section`
  height: 100%;
  background: #f4f4f4;
  >div{
    &:last-child{
      padding-left:12px;
    }
  }
  .img-container{
    display: flex;
    width: 70%;
    border-radius: 4px;
    box-shadow: 0px 0px 3px black;
    border: 1px solid black;
    .img-slider{
      position: relative;
      display: flex;
      width: 100%;
      overflow: hidden;
      .slide_img{
        position : relative;
        left: 0%;
        display: flex;
        animation: ${slideAni} 5s linear infinite alternate;
        animation-delay: 3s;
      }
      img{
        display: inline-block;
        width: 100%;
        float: left;
      }
    }
    
  }
  .body-wrap{
    width: 25%;
    text-align: center;
    .body-subtitle{
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
    }
    .body-text{
      font-size: 1.3rem;
    }
  }
`

const ScrollArrowAni = keyframes`
  0%{
    transform: translate(-120%, 0) rotate(-45deg);
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    transform: translate(-120%, 20px) rotate(-45deg);
    opacity: 0;
  }
`

export const ScrollInduce = styled.div`
  position:relative;
  >span{
    position: absolute;
    width: 24px;
    height: 24px;
    margin-left: 17px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    transform: translate(-125%, 0) rotate(-45deg);
    animation: ${ScrollArrowAni} 1.5s linear infinite;
    box-sizing: border-box;  
  }
  >p{
    padding-top:60px;
  }
`
