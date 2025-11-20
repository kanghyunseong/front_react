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
import axios from "axios";
//useEffect는 매페이지 열릴때마다 보여주는것이다.
//useState

const Station = () => {
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecomend, setIsRecomend] = useState(null);
  const [searchStation, setSearchStation] = useState(null);
  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  //현재 페이지 리뷰 계산
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  useEffect(() => {
    const searchStation = setSearchStation(() => {});
    //if (!location) return;
    console.log(location);
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
        //console.log(lat);
        //console.log(lng);
        setLocation({
          latitude: lat,
          longitude: lng,
        });
        if (!location) return;
        //사용자 주소를 앞단으로 보냄
        const fn1 = async () => {
          const abcd = await axios.get(
            "http://localhost:8081/station/EvCharge",
            {
              params: {
                lat: location.latitude,
                lng: location.longitude,
              },
            }
          );

          const mmm = abcd.data.map((e) => {
            return {
              title: e.stationName,
              latlng: new kakao.maps.LatLng(e.lat, e.lng),
            };
          });

          setPositions([...mmm]);

          //console.log(positions);
          // 4. 지도 생성 (위치 정보 받은 후)
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng), // 현재 위치로 설정
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
          var markerPosition = new kakao.maps.LatLng(lat, lng);

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          for (var i = 0; i < mmm.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: mmm[i].latlng, // 마커를 표시할 위치
              title: mmm[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
          }

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
            radius: 3000,
            strokeWeight: 5,
            strokeColor: "#75B8FA",
            strokeOpacity: 1,
            strokeStyle: "solid",
            fillColor: "#CFE7FF",
            fillOpacity: 0.3,
          });
          circle.setMap(map);

          setLoading(false);
        };

        fn1();
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
  }, [location?.latitude]);

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
            onChange={(e) => searchStation(e.target.value)}
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

        {/* 페이징 버튼 */}
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span> {currentPage} </span>
          <button onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        </div>
      </RightSection>
    </MainContainer>
  );
};

export default Station;
