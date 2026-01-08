import { LeftSection, MainContainer, RightSection } from "./Station.style";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import SearchSection from "./SearchSection";
import MapSection from "./MapSection";
import ReviewSection from "./ReviewSection";
import { axiosPublic } from "../../api/reqService";

const Station = () => {
  // ===========================
  // State 정의
  // ===========================
  const { auth } = useContext(AuthContext);
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecomend, setIsRecomend] = useState("");
  const [searchStation, setSearchStation] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [stationId, setStationId] = useState(null);
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState([]);
  const [stationName, setStationName] = useState("");
  const mapRef = useRef(null);

  // ===========================
  // 검색 관련 함수
  // ===========================
  const handleSearch = () => {
    const keyword = (searchStation || "").trim();
    if (!keyword) {
      alert("검색어를 입력하세요!");
      return;
    }

    axiosPublic
      .getActual(`/api/station/search?keyword=${keyword}`)
      .then((res) => {
        setSearchResult(res);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "검색 중 오류가 발생했습니다.");
      });
  };

  const handleResultClick = (stationIdParam) => {
    const station = searchResult.find((s) => s.stationId === stationIdParam);
    if (!station) return;

    const lat = parseFloat(station.lat);
    const lng = parseFloat(station.lng);

    if (mapRef.current && !isNaN(lat) && !isNaN(lng)) {
      const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
      if (typeof mapRef.current.panTo === "function") {
        mapRef.current.panTo(moveLatLng);
      } else {
        mapRef.current.setCenter(moveLatLng);
      }
    }

    axiosPublic
      .getActual(`/api/station/searchDetail/${stationIdParam}`)
      .then((res) => {
        const stationDetail = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!stationDetail) {
          alert("상세정보가 없습니다.");
          return;
        }
        const {
          address,
          detailAddress,
          regDate,
          stationName: sname,
          tel,
          useTime,
        } = stationDetail;

        alert(
          `[${sname}]\n주소: ${address} ${detailAddress}\n연락처: ${tel}\n이용시간: ${useTime}\n등록일: ${regDate}`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ===========================
  // 위치 정보 및 데이터 로드
  // ===========================
  useEffect(() => {
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

        setLocation({ latitude: lat, longitude: lng });

        const fetchStationData = async () => {
          try {
            const res = await axiosPublic.getActual(
              `/api/station?lat=${lat}&lng=${lng}`
            );
            const mapping = res.map((e) => {
              const parsedLat = parseFloat(e.lat ?? e.latitude);
              const parsedLng = parseFloat(e.lng ?? e.longitude);
              return {
                title: e.stationName,
                subtitle: e.address,
                lat: parsedLat,
                lng: parsedLng,
                latlng:
                  !isNaN(parsedLat) && !isNaN(parsedLng)
                    ? new window.kakao.maps.LatLng(parsedLat, parsedLng)
                    : null,
                stationId: e.stationId,
              };
            });
            setPositions(mapping);
            setLoading(false);
          } catch (error) {
            setError(
              error.message === "Network Error"
                ? "서버 연결 오류"
                : error.response?.data?.message
            );
            setLoading(false);
          }
        };
        fetchStationData();
      },
      (err) => {
        setError("위치 정보를 가져올 수 없습니다.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, []);

  // 로딩 화면 디자인
  if (loading) {
    return (
      <MainContainer style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>
          🧭 주변 충전소를 찾는 중입니다...
        </div>
      </MainContainer>
    );
  }

  // 에러 화면 디자인
  if (error) {
    return (
      <MainContainer style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", color: "#e74c3c" }}>
          <h3>오류 발생</h3>
          <p>{error}</p>
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {/* 왼쪽 : 검색 영역 */}
      <LeftSection>
        <SearchSection
          searchStation={searchStation}
          searchResult={searchResult}
          setSearchStation={setSearchStation}
          handleSearch={handleSearch}
          handleResultClick={handleResultClick}
        />
      </LeftSection>

      {/* 오른쪽 : 지도 + 리뷰 */}
      <RightSection>
        <MapSection
          location={location}
          positions={positions}
          stationName={stationName}
          mapRef={mapRef}
          setStationId={setStationId}
          setStationName={setStationName}
        />
        <ReviewSection
          stationId={stationId}
          refresh={refresh}
          comment={comment}
          isRecomend={isRecomend}
          auth={auth}
          setRefresh={setRefresh}
          setComment={setComment}
          setIsRecomend={setIsRecomend}
        />
      </RightSection>
    </MainContainer>
  );
};

export default Station;
