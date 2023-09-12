import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const PageContainerWithMenu = styled.section`
  display:grid;
  // grid-template-columns : 1fr 4fr;
  font-family: 'omyu';
  padding:12px;
  background:#feffef;
` 

export const PageContainer = styled.article`
  display:grid;
  grid-template-columns: 3fr 1fr;
  height:calc(100vh - 80px);
  padding:12px;
  box-sizing:border-box;
  font-family: 'omyu';
  overflow: hidden;
  >section{
    // height:inherit;
    display: flex;
  } 
  @media screen and (max-width:1100px){
    grid-template-columns: 2.5fr 1fr;
  }

  @media screen and (max-width: 700px){
    grid-template-columns: none;
  }
`

export const TitleSection = styled.section`
  margin: auto;
  text-align: center;
`

export const TextWithLeftImageSection = styled.section`
  >div{
    float:left;
    &:last-child{
      padding-left:12px;
    }
    >h3{
      margin:0;
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
