import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

//회원가입 및 로그인 스타일 , SignUp and Login style
export const PopupBackground = styled.div`
  position:absolute;
  top:0;
  left:0;
  z-index:4;
  width:100%;
  height:100%;
  background:#171616a6;
  *{
    font-family: 'omyu';
  }
`

export const PopupBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  border: 1px solid white;
  margin: auto;
  padding:2rem;
  box-sizing:border-box;
  background:white;
  border-radius:7px;
  transform:translate(-50%, -50%);
  @media screen and (max-width:500px){
    width:80%;
  }

  @media screen and (max-width:1024px){
    width:60%;
  }
`

export const PopupCloseButton = styled.button`
  position:absolute;
  top:5px;
  right:5px;
  width:25px;
  height:25px;
  background:white;
  border-radius:100%;
  cursor: pointer;
  transition: all 0.2s;
  &:hover{
    background:black;
    color:white;
  }
`

export const CloseImage = styled.div`
  display:inline-block;
  &::after{
    content: '\\00d7';
    display:inline-block;
    font-size:1.5rem;
    transform:translate(-22%,-25%);
  }
`

export const PopupForm = styled.form`
  padding:6px;
  margin:auto;
  @media screen and (max-width:500px){
    width:100%;
  }
`;

export const PopupBodyTitle = styled.p`
  text-align:center;
  font-size:2rem;
  margin:20px 0;
`

export const PopupInputWrap = styled.div`
  margin:15px auto;
  @media screen and (max-width:500px){
    width:90%;
  }
`

export const PopupInput = styled.input`
  width: 100%;  
  height: 30px;
  padding: 20px 10px;
  border: 1px solid #ccc;
  border-style: inset;
  border-radius: 4px;
  box-sizing: border-box;
`

export const PopupLabel = styled.label`
  position: relative;
  top: 10px;
  left: 10px;
  background: white;
  display:inline-block;
  text-align:right;
  margin-right:2.5%;
  font-size:1rem;
`

export const PopupButton = styled.input`
  display:block;
  width:100%;
  height:50px;
  line-height:50px;
  margin:30px auto 0 auto;
  text-align:center;
  background-color:#9595ff;
  font-size:1.25rem;
  border-radius: 4px;
  transition:all 0.2s;
  cursor:pointer;
  &:hover{
    background-color:#5b5bd8;
    color:white;
  }
`

export const PopupAdditionalWrap = styled.div<{count : number}>`
  padding: 6px;
  box-sizing: border-box;
  >button{
    width:calc( 100% / ${props => props.count ? props.count : 1} - 4px);
    margin: 0px 2px;
    background: none;
    border: none;
    height: 30px;
    &:hover{
      font-weight:bold;
      font-size:.9rem;
      cursor: pointer;
    }
  }
`

//로딩 스타일, Loading Style
export const LoadingLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:#171616a6;
  z-index:5;
`

const rotateLoading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingTextOpacity = keyframes`
  0% {opacity: 0}
  20% {opacity: 0}
  50% {opacity: 1}
  100% {opacity: 0}
`

export const LoadingContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
  border-radius: 100%;
  transform: translate(0, 200%);
`

export const LoadingBorder = styled.div`
  position: inherit;
  width: inherit;
  height: inherit;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent #fff transparent #fff;
  animation: ${rotateLoading} 1.5s linear 0s infinite normal;
`

export const LoadingText = styled.div`
  width: inherit;  
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0;
  text-align: center;
  text-transform: uppercase;
  transform: translate(0, -370%);
  animation: ${LoadingTextOpacity} 2s linear 0s infinite normal;
`