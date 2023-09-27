import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

//로딩 스타일, Loading Style
export const LoadingLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  transform: translate(-50%, -50%);
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