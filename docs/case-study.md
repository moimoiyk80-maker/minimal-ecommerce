# Minimal Ecommerce Case Study

React를 활용해 상품 탐색, 선택 상태와 장바구니 흐름을 직접 구현한 반응형 커머스 UI 프로젝트입니다.

---

## 1. Project Overview

| 항목 | 내용 |
|---|---|
| Project | Minimal Ecommerce |
| Type | Responsive Commerce UI |
| Role | UI Design, Responsive UI, React Implementation |
| Stack | React, React Router, Vite, CSS, Context API, Vercel |
| Scope | Product List, Product Detail, Favorites, Recently Viewed, Cart |
| Status | Responsive Web / Deployed |

### My Contribution

- 상품 탐색과 상세 확인 흐름 설계
- 검색·필터·정렬 인터랙션 구현
- 상품 옵션과 수량 선택 상태 구현
- 관심 상품, 최근 본 상품과 장바구니 상태 연결
- 반복되는 상품 UI의 공통 컴포넌트화
- 데스크톱과 모바일 반응형 UI 구현
- Vercel 배포 및 기능 점검

## 2. Why This Project

HTML과 CSS를 중심으로 반응형 웹을 제작해 온 경험에서 확장해,
사용자의 선택에 따라 화면과 데이터가 변화하는 인터페이스를 직접 구현하기 위해 시작했습니다.

정적인 상품 화면을 만드는 데 그치지 않고 검색, 필터, 상세 옵션, 관심 상품과 장바구니가 
하나의 흐름으로 연결되는 구조를 React로 구현하는 데 집중했습니다.

이 프로젝트의 목적은 프론트엔드 개발자로 전환하는 것이 아니라,
UI를 설계한 뒤 실제 상태와 인터랙션까지 코드로 연결할 수 있는 역량을 확장하는 것이었습니다.

```text
Responsive UI 제작 경험
        ↓
React 상태 기반 인터랙션
        ↓
디자인과 구현을 연결하는 역량

## 3. Implementation Goal

상품 목록을 보여주는 정적인 커머스 화면에서 확장해,
사용자의 탐색과 선택 상태가 화면 전반에 일관되게 반영되는
인터페이스를 구현하는 것을 목표로 했습니다.

### Core Goals
- 검색과 필터 조건을 쉽게 확인할 수 있는 탐색 UI
- 상품 목록에서 상세 확인까지 자연스럽게 이어지는 흐름
- 옵션, 수량과 장바구니 상태가 명확하게 보이는 인터랙션
- 관심 상품과 최근 본 상품을 활용한 탐색 보조 기능
- 반복되는 상품 UI를 일관되게 관리하는 공통 컴포넌트
- 다양한 화면 크기에 대응하는 반응형 레이아웃

### Primary User Flow

Product Discovery
        ↓
Search / Filter / Sort
        ↓
Product Detail
        ↓
Option & Quantity Selection
        ↓
Favorites or Cart

사용자가 현재 어떤 조건과 상품을 선택했는지 쉽게 인지하고,
이전 단계의 상태가 다음 행동으로 자연스럽게 이어지도록 구성했습니다.

## 4. Product Discovery & Interaction

상품 탐색 과정에서는 사용자가 현재 적용한 조건과 결과를 쉽게 이해할 수 있도록 
검색, 필터와 정렬 상태를 명확하게 표현하는 데 집중했습니다.

### Search

검색어 입력에 따라 상품 목록이 즉시 변경되도록 구현했습니다.

사용자가 입력 중일 때 불필요한 연산이 반복되지 않도록 debounce를 적용하고, 
검색 결과가 없을 때는 별도의 빈 상태를 표시했습니다.

### Filter

카테고리와 색상 조건을 함께 적용할 수 있도록 구성했습니다.

선택한 조건은 활성 버튼과 필터 칩으로 표시해 
사용자가 현재 어떤 조건으로 상품을 보고 있는지 확인할 수 있도록 했습니다.

필터 초기화 기능을 제공해 여러 조건을 한 번에 해제할 수 있도록 구성했습니다.

### Sort

가격 낮은순과 높은순 정렬을 지원하고, 
모바일에서는 정렬 옵션을 바텀시트 형태로 제공했습니다.

정렬 모달에서는 다음 인터랙션을 구현했습니다.

- 현재 선택된 정렬 상태 표시
- 배경 클릭 시 닫기
- ESC 키로 닫기
- 모달이 열린 동안 배경 스크롤 제한

### Product Detail

상품 카드 선택 시 상세 화면으로 이동해 이미지, 상품 정보와 구매 옵션을 확인할 수 있도록 구성했습니다.

상세 화면에서는 다음 행동이 이어지도록 구현했습니다.

```text
상품 정보 확인
        ↓
옵션 선택
        ↓
수량 조정
        ↓
관심 상품 또는 장바구니 추가

단순히 상세 정보를 보여주는 데 그치지 않고, 
사용자가 선택한 옵션과 수량이 다음 행동에 반영되도록 구성했습니다.

<img
  src="../readme/main.png"
  alt="Minimal Ecommerce product discovery interface"
  width="100%"
/>

## 5. State-based UI

이 프로젝트에서는 사용자의 행동에 따라 화면 상태가 어떻게 변화하는지를 
직접 구현하는 데 중점을 두었습니다.

### Local State

검색어, 필터, 정렬, 옵션 선택과 수량처럼 특정 화면 안에서 사용되는 값은 
컴포넌트 상태로 관리했습니다.

이를 통해 사용자의 선택이 즉시 화면에 반영되도록 구성했습니다.

### Shared State

관심 상품, 최근 본 상품과 장바구니처럼 여러 화면에서 공유해야 하는 상태는 
Context API를 활용해 관리했습니다.

```text
Product List
        ↓
Product Detail
        ↓
Favorites / Recently Viewed / Cart
        ↓
Shared Context State

상품 상세에서 선택한 정보가 장바구니와 배지에 반영되고,
다른 페이지로 이동해도 상태가 유지되도록 구성했습니다.

### Visible Feedback

상태 변화가 코드 내부에서만 처리되지 않고 사용자에게 명확하게 보이도록 다음 피드백을 적용했습니다.

- 활성 필터와 정렬 상태
- 관심 상품 선택 상태
- 선택한 옵션과 수량
- 장바구니 상품 수 배지
- 검색 결과 개수
- 조건에 맞는 상품이 없을 때의 빈 상태

이 과정을 통해 React 상태 관리가 단순한 데이터 저장이 아니라,
사용자가 현재 상황을 이해하도록 돕는 UI 표현과 연결된다는 점을 학습했습니다.

<img
  src="../readme/detail.png"
  alt="Product options and state-based detail interface"
  width="100%"
/>

## 6. Component Structure

반복되는 상품 UI와 인터랙션을 공통 컴포넌트로 분리해
페이지마다 동일한 패턴을 다시 작성하지 않도록 구성했습니다.

### Reusable UI

주요 공통 UI는 다음과 같습니다.

- ProductCard
- ProductList
- ProductCarousel
- Filter Controls
- Sort Bottom Sheet
- Header
- Cart Badge
- Theme Toggle

상품 카드는 목록, 관심 상품과 최근 본 상품 영역에서 공통으로 사용할 수 있도록 
상품 데이터를 전달받는 구조로 구현했습니다.

### Data Flow

상품 데이터는 별도 파일로 분리하고, 
각 컴포넌트가 필요한 정보를 전달받아 렌더링하도록 구성했습니다.

```text
Product Data
        ↓
Product List / Carousel
        ↓
Product Card
        ↓
Product Detail

공통 컴포넌트를 통해 상품 정보의 표현 방식을 일관되게 유지하고,
새로운 상품이나 목록 영역이 추가 돼도 기존 구조를 활용할 수 있도록 했습니다.

### Performance Considerations

성능 최적화 자체를 프로젝트의 주된 목표로 두지는 않았지만,
인터랙션이 많은 UI가 불필요하게 반복 처리되지 않도록 다음 사항을 적용했습니다.

- 검색 입력 debounce
- 필터링 및 정렬 결과에 useMemo 적용
- 이미지 lazy loading
- 반복되는 캐러셀 UI의 공통 컴포넌트화

이 기능들은 고급 프론트엔드 구조를 강조하기 위한 것이 아니라,
사용자가 상품을 탐색할 때 자연스럽고 안정적인 화면을 제공하기 위한 보조 수단으로 적용했습니다.

## 7. Responsive Design

데스크톱 화면을 단순히 축소하지 않고, 
모바일에서도 상품 탐색과 선택 상태가 명확하게 유지되도록 
레이아웃과 인터랙션을 조정했습니다.

### Product Grid

화면 폭에 따라 상품 카드의 열 수를 변경하고, 
작은 화면에서는 카드의 이미지와 텍스트가 지나치게 작아지지 않도록 구성했습니다.

### Filter and Sort

필터 버튼은 화면 폭에 따라 자연스럽게 줄바꿈 되도록 했으며,
정렬 기능은 모바일에서 화면 하단 바텀시트로 제공했습니다.

### Product Detail

상세 화면에서는 이미지, 상품 정보, 옵션과 수량 선택 영역을 단일 컬럼으로 재배치해 
작은 화면에서도 순서대로 확인할 수 있도록 했습니다.

### Cart and Shared UI

장바구니, 관심 상품과 최근 본 상품 영역에서도 동일한 상품 카드와 상태 표현이 유지되도록 했습니다.

반응형 설계의 목적은 화면을 작게 만드는 것이 아니라,
기기가 달라져도 다음 흐름이 유지되도록 하는 것이었습니다.

```text
상품 탐색
→ 상세 확인
→ 옵션 선택
→ 관심 상품 또는 장바구니

<img
  src="../readme/responsive.png"
  alt="Minimal Ecommerce responsive interface"
  width="100%"
/>

## 8. Outcome & Reflection

### Outcome

Minimal Ecommerce를 통해 정적인 상품 화면에서 확장해,
사용자의 탐색과 선택 상태가 서로 연결되는 커머스 UI를 React로 구현했습니다.

주요 결과는 다음과 같습니다.

- 검색, 필터와 정렬이 연결된 상품 탐색 UI 구현
- 옵션과 수량 선택이 반영되는 상품 상세 인터랙션 구현
- 관심 상품, 최근 본 상품과 장바구니 상태 연결
- 반복되는 상품 UI의 공통 컴포넌트화
- 데스크톱과 모바일 반응형 구현
- 다크 모드와 주요 선택 상태 표현
- Vercel 배포 및 실제 환경 기능 점검

### What This Project Demonstrates

```text
HTML·CSS 기반 반응형 UI 경험
        ↓
React 상태와 인터랙션 구현
        ↓
디자인과 동작을 코드로 연결하는 능력

이 프로젝트는 프론트엔드 개발 역량 자체를 전면에 내세우기보다,
설계한 UI를 실제로 동작하는 인터페이스로 구현하고 개발자와
협업할 수 있는 기술적 이해를 확장했다는 점에 의미가 있습니다.

### What I Learned

사용자가 보는 화면은 개별 요소의 집합이 아니라, 
검색 조건, 상품 선택과 장바구니 상태가 서로 연결된 흐름이라는 점을
구현 과정에서 구체적으로 이해했습니다.

또한 공통 컴포넌트는 단순히 코드를 줄이기 위한 수단이 아니라,
여러 화면에서 동일한 시각 규칙과 인터랙션을 유지하기 위한 기준이라는 점을 경험했습니다.

### Limitations

본 프로젝트는 실제 결제와 서버 통신이 없는 프론트엔드 포트폴리오 프로젝트입니다.

상품 데이터는 정적 데이터로 구성했고, 
로그인, 재고, 주문, 결제와 백엔드 연동은 구현 범위에서 제외했습니다.

정량적인 사용자 테스트나 운영 성과가 없으므로 
사용성 개선이나 전환율 향상과 같은 성과를 제시하지 않았습니다.

### Connection to the Next Project

이 프로젝트에서 반복되는 UI를 공통 컴포넌트로 관리하며,
개별 화면을 넘어 일관된 규칙을 정의할 필요성을 확인했습니다.

이 경험을 다음 프로젝트인 Frame Design System으로 확장해
컬러, 타이포그래피, 간격, 컴포넌트와 테마를 체계화했습니다.

## 🔗 Live Demo

http://minimal-ecommerce-psi.vercel.app