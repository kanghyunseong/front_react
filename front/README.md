# Share EV - 전기차 공유 플랫폼

<div align="center">

![Share EV](https://img.shields.io/badge/Share-EV-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)

**함께 나누는 친환경 모빌리티로 지구를 지키고 더 나은 미래를 만들어가세요**

[기능 소개](#-주요-기능) • [시작하기](#-시작하기) • [기술 스택](#-기술-스택) • [프로젝트 구조](#-프로젝트-구조) • [시연 영상](#-시연-영상)

</div>

---

## 💡 한 줄 소개

**전기차를 공유하고 빌릴 수 있는 커뮤니티 기반 플랫폼으로, 회원들 간의 차량 공유를 통해 친환경 모빌리티 문화를 만들어갑니다.**

---

## 📋 프로젝트 소개

**Share EV**는 전기차를 공유하고 빌릴 수 있는 커뮤니티 기반 플랫폼입니다. 회원들 간의 전기차 공유를 통해 탄소 배출을 줄이고 지속 가능한 미래를 만들어가는 것을 목표로 합니다.

### 핵심 가치
- 🚗 **다양한 차량**: 소형부터 대형 SUV까지 원하는 전기차를 자유롭게 선택
- 🎁 **무료 대여**: 커뮤니티 회원들과 무료로 차량을 나누고 함께 성장
- 🌍 **환경 보호**: 공유를 통해 탄소 배출을 줄이고 지속 가능한 미래를 만들어요

---

## ✨ 주요 기능

### 👤 팀원별 담당 기능

#### 팀원 1: 회원 관리 및 인증 시스템
- 일반 회원가입 및 로그인 기능 구현
- 소셜 로그인 연동 (카카오, 네이버)
- JWT 토큰 기반 인증 처리
- 회원 정보 관리 (프로필 수정, 비밀번호 변경, 회원 탈퇴)
- AuthContext를 통한 전역 인증 상태 관리

#### 팀원 2: 차량 예약 시스템
- 차량 검색 및 목록 조회 기능
- 차량 상세 정보 페이지 구현
- 차량 예약 및 예약 확인 기능
- 예약 변경 및 취소 기능
- 예약 내역 조회 및 관리

#### 팀원 3: 리뷰 및 커뮤니티 시스템
- 차량 이용 후 리뷰 작성/수정/삭제 기능
- 자유 게시판 CRUD 기능 구현
- 이미지 게시판 기능 구현
- 댓글 시스템 구현
- 게시글 신고 기능

#### 팀원 4: 관리자 대시보드 및 관리 기능
- 관리자 대시보드 구현 (Chart.js 활용)
- 회원 통계 및 트렌드 분석 차트
- 차량 통계 및 일일 예약 현황 시각화
- 차량 관리 (등록, 수정, 삭제)
- 회원 관리 및 커뮤니티 신고 처리

#### 팀원 5: 충전소 및 공지사항 시스템
- 충전소 검색 및 상세 정보 조회
- 내가 저장한 충전소 관리 기능
- 공지사항 조회 및 상세 페이지
- 관리자 공지사항 작성/수정/삭제 기능

---

## 🛠 기술 스택

### Frontend
- **React** 19.2.0 - UI 라이브러리
- **Vite** 7.2.2 - 빌드 도구
- **React Router DOM** 7.9.5 - 라우팅
- **Axios** 1.13.2 - HTTP 클라이언트
- **Styled Components** 6.1.19 - CSS-in-JS 스타일링
- **Chart.js** 4.5.1 - 차트 라이브러리
- **React ChartJS 2** 5.3.1 - React용 Chart.js 래퍼
- **React Icons** 5.5.0 - 아이콘 라이브러리
- **React Datepicker** 8.9.0 - 날짜 선택 컴포넌트

### 개발 도구
- **ESLint** - 코드 린팅
- **React Hooks Plugin** - React Hooks 규칙 검사

---

## 🚀 시작하기

### 필수 요구사항
- Node.js (v18 이상 권장)
- npm 또는 yarn
- 백엔드 서버 (포트 8081)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd react/front
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:5173
```



---

## 📁 프로젝트 구조

```
front/
├── public/                 # 정적 파일
│   └── vite.svg
├── src/
│   ├── Admin/             # 관리자 페이지
│   │   ├── Components/    # 관리자 컴포넌트
│   │   │   ├── DashBoard/ # 대시보드 차트
│   │   │   ├── Layout/    # 관리자 레이아웃
│   │   │   └── SideBar/   # 관리자 사이드바
│   │   └── Pages/         # 관리자 페이지
│   │       ├── Cars/      # 차량 관리
│   │       ├── Community/ # 커뮤니티 관리
│   │       ├── Enviroments/ # 환경 관리
│   │       └── User/      # 회원 관리
│   ├── api/               # API 설정
│   │   ├── instance.js    # Axios 인스턴스
│   │   └── social.js      # 소셜 로그인 API
│   ├── assets/            # 이미지 및 리소스
│   ├── component/         # 공통 컴포넌트
│   │   ├── Boards/        # 게시판 관련
│   │   ├── Cars/          # 차량 관련
│   │   ├── Common/        # 공통 컴포넌트
│   │   │   ├── Footer/    # 푸터
│   │   │   ├── Header/    # 헤더
│   │   │   ├── Home/      # 홈 페이지
│   │   │   ├── Nav/       # 네비게이션
│   │   │   └── Sidebar/   # 사이드바
│   │   ├── Member/        # 회원 관련
│   │   │   ├── detail/    # 회원 상세/수정
│   │   │   ├── Join/      # 회원가입
│   │   │   └── Login/     # 로그인
│   │   └── Stations/      # 충전소 관련
│   ├── context/           # Context API
│   │   └── AuthContext.jsx # 인증 컨텍스트
│   ├── App.jsx            # 메인 앱 컴포넌트
│   ├── App.css            # 전역 스타일
│   ├── main.jsx           # 진입점
│   └── index.css          # 기본 스타일
├── .eslintrc.js           # ESLint 설정
├── index.html             # HTML 템플릿
├── package.json           # 의존성 관리
├── vite.config.js         # Vite 설정
└── README.md              # 프로젝트 문서
```

---

## 🔑 주요 페이지

### 사용자 페이지
- `/` - 홈 페이지
- `/cars/searchList` - 차량 검색
- `/cars/:carId` - 차량 상세 정보
- `/cars/:carId/reserve` - 차량 예약
- `/boards` - 자유 게시판
- `/imgBoards` - 이미지 게시판
- `/notices` - 공지사항
- `/stations` - 충전소 검색
- `/members/detail` - 내 정보

### 관리자 페이지
- `/admin` - 관리자 대시보드
- `/admin/cars/overview` - 차량 목록
- `/admin/cars/registration` - 차량 등록
- `/admin/user/userOverview` - 회원 목록
- `/admin/community/declaration` - 신고 관리
- `/admin/community/notice/noticeList` - 공지사항 관리

---

## 🔐 인증 및 권한

- **일반 사용자**: 회원가입, 로그인, 차량 예약, 커뮤니티 이용
- **관리자**: 모든 사용자 기능 + 관리자 대시보드 접근 권한
- **보호된 라우트**: 관리자 페이지는 `ROLE_ADMIN` 권한이 필요합니다

---

## 📝 API 연동

프로젝트는 백엔드 API와 연동됩니다. 기본 API URL은 `http://localhost:8081`입니다.

### 주요 API 엔드포인트
- `/members/*` - 회원 관련 API
- `/cars/*` - 차량 관련 API
- `/reserve/*` - 예약 관련 API
- `/boards/*` - 게시판 관련 API
- `/admin/api/*` - 관리자 API

---

## 🎨 스타일링

프로젝트는 **Styled Components**를 사용하여 컴포넌트별로 스타일을 관리합니다. 각 컴포넌트는 `.styles.js` 파일을 통해 스타일을 정의합니다.

---

## 🎬 시연 영상

### 시연 화면 (GIF)

<div align="center">

![시연 화면 1](https://via.placeholder.com/800x450?text=Share+EV+Demo+GIF)
*메인 페이지 및 차량 예약 시연*

![시연 화면 2](https://via.placeholder.com/800x450?text=Admin+Dashboard+Demo)
*관리자 대시보드 시연*

</div>

### 시연 영상 (YouTube)

프로젝트 전체 시연 영상을 확인하실 수 있습니다.

[![시연 영상](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID)

> 📌 **참고**: 위 링크는 예시입니다. 실제 유튜브 영상 링크로 교체해주세요.

---

## 🐛 트러블슈팅

### 1. Axios 인터셉터 문법 오류
**문제**: `instance.interceptors.response.use` 뒤에 괄호가 누락되어 문법 오류 발생
```javascript
// ❌ 문제 코드
instance.interceptors.response.use
  (response) => response,
  (error) => { ... }
```

**해결**: 괄호를 추가하여 올바른 함수 호출 형태로 수정
```javascript
// ✅ 해결 코드
instance.interceptors.response.use(
  (response) => response,
  (error) => { ... }
);
```

### 2. API 인스턴스 중복 문제
**문제**: `api/instance.js`와 `component/Boards/api.jsx`에 두 개의 axios 인스턴스가 존재하여 코드 중복 발생

**해결**: 공통 인스턴스를 `api/instance.js`로 통일하고, 모든 컴포넌트에서 이를 import하여 사용하도록 리팩토링

### 3. ProtectedRoute의 authLoading 상태 오류
**문제**: `AuthContext`에 `authLoading` 상태가 정의되지 않았는데 `ProtectedRoute`에서 사용

**해결**: `AuthContext`에 `authLoading` 상태를 추가하거나, 조건부 렌더링 로직을 수정하여 인증 상태 확인 후 라우팅 처리

### 4. 하드코딩된 API URL
**문제**: 61개 파일에 `http://localhost:8081`이 하드코딩되어 있어 환경별 설정 변경이 어려움

**해결**: 환경 변수(`.env`)를 사용하여 API URL을 관리하도록 변경
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
```

### 5. 소셜 로그인 클라이언트 ID 노출
**문제**: 카카오, 네이버 클라이언트 ID가 코드에 직접 노출

**해결**: 환경 변수로 관리하여 보안 강화
```javascript
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
```

### 6. CORS 에러 처리
**문제**: 백엔드와 프론트엔드가 다른 포트에서 실행되어 CORS 에러 발생

**해결**: Vite의 프록시 설정을 활용하여 개발 환경에서 CORS 문제 해결
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    }
  }
}
```

---

## 💡 프로젝트를 통해 얻은 것

### 기술적 성장
- **React Hooks 활용**: useState, useEffect, useContext 등을 활용한 상태 관리 및 생명주기 관리
- **Context API**: 전역 상태 관리 패턴 학습 및 적용
- **React Router**: SPA 라우팅 구현 및 보호된 라우트 구현 경험
- **Styled Components**: CSS-in-JS를 통한 컴포넌트 기반 스타일링
- **Chart.js**: 데이터 시각화 및 대시보드 구현 경험
- **Axios**: HTTP 클라이언트를 통한 RESTful API 연동

### 협업 및 프로젝트 관리
- **Git/GitHub**: 버전 관리 및 협업 워크플로우 학습
- **컴포넌트 설계**: 재사용 가능한 컴포넌트 설계 및 구조화
- **코드 리뷰**: 팀원 간 코드 리뷰를 통한 코드 품질 향상
- **이슈 관리**: 프로젝트 이슈 추적 및 해결 과정 경험

### 문제 해결 능력
- **디버깅**: 브라우저 개발자 도구를 활용한 문제 진단 및 해결
- **에러 처리**: 다양한 에러 상황에 대한 적절한 처리 방법 학습
- **성능 최적화**: 불필요한 리렌더링 방지 및 최적화 기법 적용

---

## 🔮 개선사항

### 단기 개선사항
- [ ] 환경 변수를 통한 API URL 및 소셜 로그인 키 관리
- [ ] API 인스턴스 통합 및 중복 코드 제거
- [ ] console.log 제거 및 로깅 라이브러리 도입
- [ ] ProtectedRoute의 authLoading 상태 처리
- [ ] 주석 처리된 코드 정리
- [ ] 에러 처리 통일 및 사용자 친화적 에러 메시지 개선

### 중기 개선사항
- [ ] TypeScript 도입을 통한 타입 안정성 확보
- [ ] 테스트 코드 작성 (Jest, React Testing Library)
- [ ] 로딩 상태 및 스켈레톤 UI 구현
- [ ] 반응형 디자인 개선
- [ ] 접근성(A11y) 개선
- [ ] 성능 최적화 (코드 스플리팅, lazy loading)

### 장기 개선사항
- [ ] PWA(Progressive Web App) 기능 추가
- [ ] 실시간 알림 기능 (WebSocket)
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드 지원
- [ ] 모바일 앱 개발 (React Native)

---

## 👥 팀원 정보

| 이름 | 역할 | 담당 기능 | GitHub |
|------|------|----------|--------|
| 팀원 1 | Frontend Developer | 회원 관리 및 인증 시스템 | [@username1](https://github.com/username1) |
| 팀원 2 | Frontend Developer | 차량 예약 시스템 | [@username2](https://github.com/username2) |
| 팀원 3 | Frontend Developer | 리뷰 및 커뮤니티 시스템 | [@username3](https://github.com/username3) |
| 팀원 4 | Frontend Developer | 관리자 대시보드 및 관리 기능 | [@username4](https://github.com/username4) |
| 팀원 5 | Frontend Developer | 충전소 및 공지사항 시스템 | [@username5](https://github.com/username5) |

> 📌 **참고**: 위 정보는 예시입니다. 실제 팀원 정보로 교체해주세요.

---

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

<div align="center">

**함께 만드는 지속가능한 미래 🌍**

Made with ❤️ by EV Community

</div>
