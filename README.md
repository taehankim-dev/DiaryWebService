# Diary Servive For Web / 웹 다어이리 서비스

## Project Introduction / 프로젝트 소개
> 웹 버전의 다이어리 서비스입니다.
> 개인의 일정을 웹으로 관리할 수 있도록 만든 다이어리 서비스입니다.

## 프로젝트 목표. (요구사항)
> 1. React와 Typescript, Recoil을 이용하여 웹 다이어리를 구현한다.
> 2. 회원가입을 한 사용자만이 Calendar에 접근할 수 있도록 한다.
> 3. 사용자가 회원가입을 할 때, 이메일 형태의 아이디를 사용해야 하고, 해당 이메일 인증을 진행해야만 이후 서비스를 이용할 수 있다.
> 4. 사용자는 원하는 일자에 일정을 저장할 수 있고, 수정하거나 삭제가 가능해야 한다.
> 5. 사용자는 처음 회원가입할 때 작성했던 비밀번호나 닉네임을 변경할 수 있어야 한다.

## 주요 기능
> 1. 로그인/회원가입을 통한 Diary 서비스 이용.
> 2. 일자별 할 일 관리. (추가, 수정, 삭제 기능)
> 3. 마이페이지에서 사용자의 닉네임 및 비밀번호 변경 가능.

## 개발 환경
* 개발환경 - Visual Studio Code
* 개발도구 - Github

## 기술 스택
* Vite
* React
* Styled Component
* Firebase
* Typescript
* Recoil

## 파일 구조
```
📦DiaryWebService
 ┣ 📂.github                        // Github Actions 를 위한 폴더.
 ┃ ┣ 📂workflows
 ┃ ┃ ┣ 📜deploy.yml 
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts                      // Font 
 ┃ ┃ ┃ ┣ 📜Font.css
 ┃ ┃ ┃ ┗ 📜omny_font.ttf
 ┃ ┃ ┗ 📂imgs                       // Images
 ┃ ┃ ┃ ┣ 📜calendar_sample01.jpg
 ┃ ┃ ┃ ┗ 📜calendar_sample02.jpg
 ┃ ┣ 📂components                   // 공통으로 사용될 컴포넌트들.
 ┃ ┃ ┣ 📂find                       // 비밀번호 찾기 컴포넌트.
 ┃ ┃ ┃ ┗ 📜FindPassword.tsx
 ┃ ┃ ┣ 📂header                     // 페이지의 Header.
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜HeaderSign.tsx
 ┃ ┃ ┣ 📂loading                    // 로딩 컴포넌트.
 ┃ ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┃ ┣ 📂login                      // 로그인.
 ┃ ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┃ ┗ 📜LoginForm.tsx
 ┃ ┃ ┣ 📂menu                       // 메뉴.
 ┃ ┃ ┃ ┗ 📜Menu.tsx
 ┃ ┃ ┗ 📂signup                     // 회원가입.
 ┃ ┃ ┃ ┣ 📜SignUp.tsx
 ┃ ┃ ┃ ┗ 📜SignUpForm.tsx
 ┃ ┣ 📂hooks                        // custom hooks
 ┃ ┃ ┣ 📜useCalendarItem.tsx
 ┃ ┃ ┣ 📜useCheckLogin.tsx
 ┃ ┃ ┣ 📜useScroll.tsx
 ┃ ┃ ┗ 📜useSignOut.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂members                    // 사용자들이 보게 될 페이지들.
 ┃ ┃ ┃ ┣ 📂calendar
 ┃ ┃ ┃ ┃ ┣ 📂calendarContents       // Calendar 부분.
 ┃ ┃ ┃ ┃ ┃ ┣ 📂calendarCell         // Calendar의 Cell 부분.
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜NewRenderCell.tsx  // 현재 사용되고 Cell Rendering 컴포넌트.
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OldCalendarCell.tsx // 이전에 사용했던 Cell Rendering 컴포넌트.
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RenderCell.tsx     
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarDays.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CalendarHeader.tsx
 ┃ ┃ ┃ ┃ ┣ 📂calendarList           // 일정 목록.
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarList.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarListItem.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CalendarListTitle.tsx
 ┃ ┃ ┃ ┃ ┣ 📂calendarWrite          // 일정 작성.
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarWrite.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarWriteContents.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarWriteDate.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CalendarWriteLoc.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CalendarWriteTitle.tsx
 ┃ ┃ ┃ ┃ ┗ 📜CalendarHome.tsx
 ┃ ┃ ┃ ┗ 📂mypage                   // 사용자의 회원정보 관련.
 ┃ ┃ ┃ ┃ ┣ 📂changePassword         // 비밀번호 찾기.
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ChangeChkNewPw.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ChangeCurPw.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ChangeNewPw.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ChangePassword.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ChangePasswordItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyPage.tsx
 ┃ ┃ ┃ ┃ ┗ 📜MyPageMyInfo.tsx
 ┃ ┃ ┣ 📂nonMembers                 // 비회원 사용자들이 보게 될 화면.
 ┃ ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┃ ┗ 📜HomeTitle.tsx
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┗ 📜PageRoutes.tsx             // 페이지 라우팅.
 ┃ ┣ 📂states                       // 컴포넌트별로 사용될 state.
 ┃ ┃ ┣ 📜CalendarState.ts
 ┃ ┃ ┣ 📜PopupState.ts
 ┃ ┃ ┗ 📜UserState.ts
 ┃ ┣ 📂styles                       // 컴포넌트별로 사용될 Style.
 ┃ ┃ ┣ 📜CalendarInfoStyle.ts
 ┃ ┃ ┣ 📜CalendarStyle.ts
 ┃ ┃ ┣ 📜ComponentsStyle.ts
 ┃ ┃ ┣ 📜HeaderStyle.ts
 ┃ ┃ ┣ 📜LoadingStyle.ts
 ┃ ┃ ┣ 📜MenuStyle.ts
 ┃ ┃ ┣ 📜MyPageStyle.ts
 ┃ ┃ ┣ 📜PageLayout.ts
 ┃ ┃ ┗ 📜PopupStyle.ts
 ┃ ┣ 📂types                        // typescript의 type.
 ┃ ┃ ┗ 📜CalendarType.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜firebase.ts                    // firebase 세팅.
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vite.config.ts
 ┗ 📜yarn.lock
```

## 프로젝트 배포 사이트 주소
* https://taehankim-dev.github.io/DiaryWebService/

## 프로젝트 관련 블로그 주소
* 현재 작성 중.

## 직접 사용해보고 싶다면?
### 1. 설치
```
yarn install
```

## 추가해보고 싶은 사항.
> 1. 일정에 대한 기간 지정 기능.
> 2. 위치 지정 시, 지도에서 선택할 수 있는 기능.
> 3. 다른 사람에게 일정 공유 기능.