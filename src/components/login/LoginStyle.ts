import styled from '@emotion/styled';

export const LoginBackground = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:#171616a6;
`

export const LoginForm = styled.form`
  display: block;
  position: relative;
  width: 40%;
  border: 1px solid white;
  margin: auto;
  padding:2rem;
  box-sizing:border-box;
  background:white;
  border-radius:7px;
  transform:translate(0, 100%);
  @media screen and (max-width:500px){
    width:80%;
  }

  @media screen and (max-width:1024px){
    width:60%;
  }
`

export const LoginCloseButton = styled.button`
  position:absolute;
  top:5px;
  right:5px;
  width:25px;
  height:25px;
  background:white;
  border-radius:100%;
`

export const CloseImage = styled.div`
  display:inline-block;
  &::after{
    content: '\\00d7';
    display:inline-block;
    font-size:1.5rem;
    transform:translate(-22%,-28%);
  }
`

export const LoginBody = styled.div`
  width:70%;
  padding:6px;
  margin:auto;
  @media screen and (max-width:500px){
    width:100%;
  }
`;

export const LoginBodyTitle = styled.p`
  text-align:center;
  font-size:2rem;
  margin:30px 0 40px 0;
`

export const LoginInputWrap = styled.div`
  margin:20px auto;
  @media screen and (max-width:500px){
    width:90%;
  }
`

export const LoginInput = styled.input`
  width:70%;  
  padding:6px;
`

export const LoginLabel = styled.label`
  display:inline-block;
  width:20%;
  text-align:right;
  margin-right:2.5%;
  font-size:1rem;
`

export const LoginButton = styled.div`
  display:block;
  height:50px;
  line-height:50px;
  margin:30px auto 0 auto;
  text-align:center;
  background-color:#9595ff;
  font-size:1.25rem;
  border-radius: 4px;
  transition:all 0.2s;
  &:hover{
    background-color:#5b5bd8;
    color:white;
  }
`