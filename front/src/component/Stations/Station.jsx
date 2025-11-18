import {
  Comment,
  LeftSection,
  MainContainer,
  Map,
  Recomend,
  Review,
  RightSection,
  SearchButton,
  SearchInput,
  SearchResult,
  SearchWrapper,
} from "./Station.style";
import { useEffect, useState } from "react";
//useEffect는 매페이지 열릴때마다 보여주는것이다.
//useState
const Station = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecomend, setIsRecomend] = useState(null);

  useEffect(() => {
    setLoading(false);
    // 1. Kakao Maps API 로드 확인
    if (!window.kakao || !window.kakao.maps) {
      setError("카카오 맵 API를 로드할 수 없습니다.");
      setLoading(false);
      return;
    }
    console.log(navigator.geolocation);
    // 2. Geolocation 지원 확인
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      setLoading(false);
      return;
    }

    // 3. 위치 정보 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({
          latitude: lat,
          longitude: lng,
          accuracy: position.coords.accuracy,
        });

        // 4. 지도 생성 (위치 정보 받은 후)
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng), // 현재 위치로 설정
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 5. 현재 위치에 마커 표시
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 6. 지도 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 7. 원 그리기 (현재 위치 기준)
        const circle = new window.kakao.maps.Circle({
          center: new window.kakao.maps.LatLng(lat, lng),
          radius: 1000,
          strokeWeight: 5,
          strokeColor: "#75B8FA",
          strokeOpacity: 1,
          strokeStyle: "solid",
          fillColor: "#CFE7FF",
          fillOpacity: 0.7,
        });
        circle.setMap(map);

        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // 높은 정확도
        timeout: 10000, // 10초 타임아웃
        maximumAge: 0, // 캐시 사용 안 함
      }
    );
  }, [location?.latitude, location?.longitude]);

  // 로딩 중
  if (loading) {
    return (
      <MainContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          위치 정보를 가져오는 중...
        </div>
      </MainContainer>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <MainContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          오류: {error}
        </div>
      </MainContainer>
    );
  }

  // 정상 렌더링
  return (
    <MainContainer>
      <LeftSection>
        <SearchWrapper>
          <SearchInput
            placeholder="궁금하신 내용을 입력하세요."
            maxLength={50}
          />
          <SearchButton>🔍</SearchButton>
        </SearchWrapper>
        <SearchResult></SearchResult>
      </LeftSection>
      <RightSection>
        <Map id="map"></Map>
        {location && ( // location이 있을 때만 표시
          <div></div>
        )}
        <Review>
          <Recomend
            onClick={() => setIsRecomend(true)}
            className={isRecomend === true ? "active" : ""}
          >
            추천
          </Recomend>
          <Recomend
            onClick={() => setIsRecomend(false)}
            className={isRecomend === false ? "dislike" : ""}
          >
            비추천
          </Recomend>
          <Comment
            placeholder="    남기고 싶은 리뷰를 입력하세요."
            maxLength={80}
          />
        </Review>
      </RightSection>
    </MainContainer>
  );
};

export default Station;
