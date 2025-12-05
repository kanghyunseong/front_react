# Share EV - 전기차 공유 플랫폼

<div align="center">

![Share EV](https://img.shields.io/badge/Share-EV-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)

**함께 나누는 친환경 모빌리티로 지구를 지키고 더 나은 미래를 만들어가세요**

[기능 소개](#-주요-기능) • [시작하기](#-시작하기) • [기술 스택](#-기술-스택) • [프로젝트 구조](#-프로젝트-구조)

</div>

---

## 📋 프로젝트 소개

**Share EV**는 전기차를 공유하고 빌릴 수 있는 커뮤니티 기반 플랫폼입니다. 회원들 간의 전기차 공유를 통해 탄소 배출을 줄이고 지속 가능한 미래를 만들어가는 것을 목표로 합니다.

### 핵심 가치
- 🚗 **다양한 차량**: 소형부터 대형 SUV까지 원하는 전기차를 자유롭게 선택
- 🎁 **무료 대여**: 커뮤니티 회원들과 무료로 차량을 나누고 함께 성장
- 🌍 **환경 보호**: 공유를 통해 탄소 배출을 줄이고 지속 가능한 미래를 만들어요

---

## ✨ 주요 기능

### 👤 사용자 기능
- **회원 관리**
  - 일반 회원가입 및 소셜 로그인 (카카오, 네이버)
  - 프로필 관리 및 비밀번호 변경
  - 회원 탈퇴

- **차량 예약**
  - 차량 검색 및 상세 정보 조회
  - 차량 예약 및 예약 확인
  - 예약 변경 및 취소
  - 예약 내역 조회

- **리뷰 시스템**
  - 차량 이용 후 리뷰 작성
  - 리뷰 수정 및 삭제

- **커뮤니티**
  - 자유 게시판 (글 작성, 수정, 삭제, 댓글)
  - 이미지 게시판
  - 공지사항 조회

- **충전소 정보**
  - 충전소 검색 및 상세 정보 조회
  - 내가 저장한 충전소 관리

### 🔐 관리자 기능
- **대시보드**
  - 회원 통계 및 트렌드 분석
  - 차량 통계 및 일일 예약 현황
  - 면허증 발급 트렌드 분석
  - KPI 지표 모니터링

- **차량 관리**
  - 차량 등록, 수정, 삭제
  - 차량 목록 조회 및 검색
  - 차량 예약 관리

- **회원 관리**
  - 회원 목록 조회 및 검색
  - 회원 정보 수정
  - 회원 삭제

- **커뮤니티 관리**
  - 게시글 신고 처리
  - 댓글 신고 처리
  - 공지사항 작성, 수정, 삭제

- **환경 관리**
  - 사용자 랭킹 조회
  - 데이터 시각화

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

3. **환경 변수 설정**
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
```env
VITE_API_BASE_URL=http://localhost:8081
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
VITE_NAVER_CLIENT_ID=your_naver_client_id
VITE_REDIRECT_URI=http://localhost:5173
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
```
http://localhost:5173
```

### 빌드
```bash
npm run build
```

### 프로덕션 미리보기
```bash
npm run preview
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

## 🐛 알려진 이슈

- API URL이 하드코딩되어 있습니다 (환경 변수로 전환 필요)
- 일부 컴포넌트에서 console.log가 남아있습니다
- ProtectedRoute에서 authLoading 상태가 정의되지 않았습니다

---

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

## 👥 기여자

프로젝트에 기여해주신 모든 분들께 감사드립니다.

---

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

<div align="center">

**함께 만드는 지속가능한 미래 🌍**

Made with ❤️ by EV Community

</div>
