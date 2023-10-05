export const useCheckLogin = (userEmail? : string) => {
  let msg = "";

  if(userEmail){
    if(userEmail === ''){
      msg = "이메일을 입력해주세요.";
      return {message : msg, loginCheck : false};
    }

    if(userEmail.length < 6){
      msg = "6자 이상의 이메일을 사용해주세요.";
      return {message : msg, loginCheck : false}
    }
  
    if(!userEmail.includes("@")){
      msg = "이메일 형식으로 작성해주세요.";
      return {message : msg, loginCheck : false};
    }
  } else {
    msg = "이메일을 입력해주세요."
    return {message : msg, loginCheck : false};
  }
  

  return {message : "로그인 체크 완료", loginCheck : true};
}