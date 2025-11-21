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
import { useEffect, useState } from "react"; // 이 줄이 있는지 확인!
import axios from "axios";

const Station = () => {
  // ===========================
  // 1. State 정의
  // ===========================
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecomend, setIsRecomend] = useState(null);
  const [searchStation, setSearchStation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [stationId, setStationId] = useState(null);

  const reviewsPerPage = 5;
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;

  // ===========================
  // 2. 검색 관련 함수
  // ===========================
  // handleSearch 함수를 useEffect 밖으로 이동
  const handleSearch = () => {
    const keyword = (searchStation || "").trim();
    if (!keyword) {
      alert("검색어를 입력하세요!");
      return;
    }

    axios
      .get("http://localhost:8081/station/search", {
        params: { keyword: keyword },
      })
      .then((response) => {
        const result = response.data;
        // 가공
        const mapped = result.map((e) => {
          return {
            stationName: e.stationName,
            address: e.address,
            lat: e.latitude,
            lng: e.longitude,
          };
        });

        setSearchResult(mapped);
      })
      .catch((error) => {
        console.error("검색실패:", error);
      });
  };

  // axios.post("http://localhost:8081/station/insert", {
  //   params: {},
  // });

  // ===========================
  // 3. 위치 정보 + 지도 + 마커 세팅 (useEffect)
  // ===========================
  useEffect(() => {
    // 이 부분 추가!
    console.log(location);
    setLoading(false);

    if (!window.kakao || !window.kakao.maps) {
      setError("카카오 맵 API를 로드할 수 없습니다.");
      setLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({
          latitude: lat,
          longitude: lng,
        });

        if (!location) return;

        const fn1 = async (selectedId) => {
          const abcd = await axios.get("http://localhost:8081/station", {
            params: {
              lat: location.latitude,
              lng: location.longitude,
              stationId: selectedId,
            },
          });

          const mmm = abcd.data.map((e) => {
            return {
              title: e.stationName,
              subtitle: e.address,
              latlng: new kakao.maps.LatLng(e.lat, e.lng),
              stationId: e.stationId,
            };
          });

          setPositions([...mmm]);

          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
          var markerPosition = new kakao.maps.LatLng(lat, lng);

          var marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          for (let i = 0; i < mmm.length; i++) {
            const item = mmm[i];
            const imageSize = new kakao.maps.Size(24, 35);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            const marker = new kakao.maps.Marker({
              map: map,
              position: item.latlng,
              title: item.title,
              image: markerImage,
            });
            kakao.maps.event.addListener(marker, "click", () => {
              const selectedId = item.stationId; // 이 마커에 해당하는 stationId

              setStationId(selectedId); // state에 기억해두고
              fn1(selectedId); // 선택한 ID 들고 fn1 다시 호출
            });
          }

          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );

          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

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
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [location?.latitude]); // ? 추가

  // ===========================
  // 4. 로딩 / 에러 화면 처리
  // ===========================
  if (loading) {
    return (
      <MainContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          위치 정보를 가져오는 중...
        </div>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          오류: {error}
        </div>
      </MainContainer>
    );
  }

  // ===========================
  // 5. 실제 화면 렌더링(JSX)
  // ===========================
  return (
    <MainContainer>
      {/* 왼쪽 : 검색 영역 */}
      <LeftSection>
        <SearchWrapper>
          <SearchInput
            placeholder="궁금하신 내용을 입력하세요."
            maxLength={50}
            onChange={(e) => setSearchResult(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchWrapper>

        <SearchResult>
          <ol>
            {searchResult &&
              searchResult.map((item, index) => {
                return (
                  <li key={index}>
                    <strong>{item.stationName}</strong>
                    <div>{item.address}</div>
                  </li>
                );
              })}
          </ol>
        </SearchResult>
      </LeftSection>

      {/* 오른쪽 : 지도 + 리뷰 + 페이지네이션 */}
      <RightSection>
        <Map id="map"></Map>
        {location && <div></div>}

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
