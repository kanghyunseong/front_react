import { LeftSection, MainContainer, RightSection } from "./Station.style";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import SearchSection from "./SearchSection";
import MapSection from "./MapSection";
import ReviewSection from "./ReviewSection";
import { axiosPublic } from "../../api/reqService";

const Station = () => {
  // ===========================
  // State 정의
  // ===========================
  const { auth } = useContext(AuthContext); // Context: 인증 정보
  const [positions, setPositions] = useState([]); // State: 충전소 위치 목록
  const [location, setLocation] = useState(null); // State: 사용자 현재 위치
  const [error, setError] = useState(null); // State: 에러 메시지
  const [loading, setLoading] = useState(true); // State: 로딩 상태
  const [isRecomend, setIsRecomend] = useState(""); // State: 추천/비추천 선택
  const [searchStation, setSearchStation] = useState(""); // State: 검색 입력값
  const [searchResult, setSearchResult] = useState([]); // State: 검색 결과
  const [stationId, setStationId] = useState(null); // State: 선택된 충전소 ID
  const [comment, setComment] = useState(""); // State: 리뷰 입력값
  const [reviewId, setReviewId] = useState(null); // State: 리뷰 ID
  const [refresh, setRefresh] = useState([]); // State: 리뷰 목록
  const [stationName, setStationName] = useState(""); // State: 선택된 충전소 이름
  const mapRef = useRef(null); // Ref: 카카오맵 객체

  // ===========================
  // 검색 관련 함수
  // ===========================
  const handleSearch = () => {
    const keyword = (searchStation || "").trim();
    if (!keyword) {
      alert("검색어를 입력하세요!");
      return;
    }
    const el = document.querySelector("#searchResult");
    if (el) el.style.background = "none";
    axiosPublic
      .getActual(`/api/station/search?keyword=${keyword}`)
      .then((res) => {
        setSearchResult(res);
      })
      .catch((error) => {
        alert(error.response.data.message);
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
      } else if (typeof mapRef.current.setCenter === "function") {
        mapRef.current.setCenter(moveLatLng);
      }
    } else {
      console.warn("지도 객체가 준비되지 않았거나 좌표가 유효하지 않습니다.");
    }

    // axios
    //   .get(`http://localhost:8081/station/searchDetail/${stationIdParam}`)
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
          stationId: sid,
          stationName: sname,
          tel,
          useTime,
        } = stationDetail;
        alert(
          "주소:" +
            address +
            "\n상세주소:" +
            detailAddress +
            "\n등록일자:" +
            regDate +
            "\n충전소ID:" +
            sid +
            "\n충전소 이름:" +
            sname +
            "\n연락처:" +
            tel +
            "\n이용시간:" +
            useTime
        );
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
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

        const stationData = async () => {
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
          } catch (error) {
            if (error?.message === "Network Error") {
              alert("서버에 오류가 있습니다.");
              setError("네트워크 오류");
            } else {
              alert(error.response.data.message);
              setError(error.response.data.message);
            }
          }
        };
        stationData();
      },
      (err) => {
        setError(err.message);
        alert(error);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }, []);

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
  // 렌더링
  // ===========================
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
