import {
  Comment,
  Elision,
  LeftSection,
  MainContainer,
  Map,
  Recomend,
  Registration,
  Review,
  RightSection,
  SearchButton,
  SearchInput,
  SearchResult,
  SearchWrapper,
} from "./Station.style";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DetailButton } from "../Cars/CarsSearchList.style";

const Station = () => {
  // ===========================
  // 1. State 정의 (원래 변수명 유지)
  // ===========================
  const { auth } = useContext(AuthContext);
  const [positions, setPositions] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecomend, setIsRecomend] = useState("");
  const [searchStation, setSearchStation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [stationId, setStationId] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const [refresh, setRefresh] = useState([]);
  const [stationName, setStationName] = useState("");
  const mapRef = useRef(null);

  // ===========================
  // 2. 검색 관련 함수
  // ===========================
  const handleSearch = () => {
    const keyword = (searchStation || "").trim();
    if (!keyword) {
      alert("검색어를 입력하세요!");
      return;
    }
    const el = document.querySelector("#searchResult");
    if (el) el.style.background = "none";

    axios
      .get("http://localhost:8081/station/search", {
        params: { keyword: keyword },
      })
      .then((response) => {
        const result = response.data || [];

        if (!result || result.length === 0) {
          alert("검색어를 찾을 수 없습니다.");
          setSearchResult([]);
          return;
        }

        const mapped = result.map((e) => {
          return {
            stationId: e.stationId,
            stationName: e.stationName,
            address: e.address,
            lat: e.latitude ?? e.lat ?? null,
            lng: e.longitude ?? e.lng ?? null,
            detailAddress: e.detailAddress,
            tel: e.tel,
            useTime: e.useTime,
            regDate: e.regDate,
          };
        });

        setSearchResult(mapped);
      })
      .catch((error) => {
        console.error("검색실패:", error);
        alert("검색에 실패했습니다.");
      });
  };

  // 검색 결과 클릭 시 지도 이동 + 상세정보 조회
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

    // 상세정보 요청 (지도 이동 후)
    axios
      .get(`http://localhost:8081/station/searchDetail/${stationIdParam}`)
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
      .catch((err) => {
        console.log(err);
      });
  };

  const register = () => {
    axios
      .post(
        "http://localhost:8081/station/insert",
        {
          stationId: stationId,
          commentContent: comment,
          recommend: isRecomend,
        },
        { headers: { Authorization: `Bearer ${auth?.accessToken}` } }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
        findAll();
        setIsRecomend(null);
        setComment("");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            alert("추천,비추천 먼저 선텍해주세요!");
          } else if (
            error.response.data &&
            error.response.data["error-message"]
          ) {
            alert(error.response.data["error-message"]);
          } else {
            alert("오류가 발생했습니다.");
          }
        } else if (error.request) {
          alert("서버가 응답하지 않습니다.");
        } else {
          alert("오류: " + error.message);
        }
      });
  };

  const currentUserNo = auth?.userNo;

  const elision = (reviewIdParam) => {
    axios
      .delete("http://localhost:8081/station", {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
        data: { reviewId: reviewIdParam },
      })
      .then((response) => {
        alert(response.data);
        findAll();
      })
      .catch((error) => {
        const msg =
          error?.response?.data?.["error-message"] ||
          "삭제 중 오류가 발생했습니다.";
        alert(msg);
      });
  };

  const findAll = () => {
    axios
      .get(`http://localhost:8081/station/findAll`, {
        params: { stationId: stationId },
      })
      .then((response) => {
        setRefresh(response.data || []);
      })
      .catch((err) => {
        console.error("리뷰 조회 실패:", err);
      });
  };

  // 3. 위치 정보 + 지도 + 마커 세팅 (useEffect)
  useEffect(() => {
    // 로딩 상태 초기화
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

        // 상태에 저장 (원하면 다른 곳에서 참조 가능)
        setLocation({
          latitude: lat,
          longitude: lng,
        });

        // 지도 생성 및 충전소 로드 함수 (로컬 lat/lng 사용)
        const stationCreate = async () => {
          try {
            const stationData = await axios.get(
              "http://localhost:8081/station",
              {
                params: {
                  lat: lat,
                  lng: lng,
                },
              }
            );

            const data = stationData.data || [];
            const mapping = data.map((e) => {
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

            setPositions([...mapping]);

            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map;

            // 내 위치 마커
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const myMarker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            myMarker.setMap(map);

            const imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            for (let i = 0; i < mapping.length; i++) {
              const item = mapping[i];
              if (!item.latlng) continue;
              const imageSize = new window.kakao.maps.Size(24, 35);
              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize
              );
              const stationMarker = new window.kakao.maps.Marker({
                map: map,
                position: item.latlng,
                title: item.title,
                image: markerImage,
              });

              // 마커 클릭 시 상세 조회 및 상태 업데이트
              window.kakao.maps.event.addListener(
                stationMarker,
                "click",
                () => {
                  const selectedId = item.stationId;
                  setStationId(selectedId);
                  setStationName(item.title);
                  stationCreate(selectedId);
                }
              );
            }

            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(
              mapTypeControl,
              window.kakao.maps.ControlPosition.TOPRIGHT
            );

            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(
              zoomControl,
              window.kakao.maps.ControlPosition.RIGHT
            );

            const circle = new window.kakao.maps.Circle({
              center: new window.kakao.maps.LatLng(lat, lng),
              radius: 5000,
              strokeWeight: 5,
              strokeColor: "#75B8FA",
              strokeOpacity: 1,
              strokeStyle: "solid",
              fillColor: "#CFE7FF",
              fillOpacity: 0.3,
            });
            circle.setMap(map);
          } catch (err) {
            console.error("지도/충전소 데이터 로드 실패:", err);
          }
        };

        // 초기 로드 (선택 ID 없이)
        stationCreate();
      },
      (err) => {
        setError(err.message || "위치 정보를 가져오지 못했습니다.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    // 빈 배열: 컴포넌트 마운트 시 한 번만 실행
  }, []);

  // 4. 로딩 / 에러 화면 처리
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
            onChange={(e) => setSearchStation(e.target.value)}
            value={searchStation}
          />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchWrapper>
        <SearchResult id="searchResult">
          <ol style={{ paddingLeft: 0 }}>
            {searchResult &&
              searchResult.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleResultClick(item.stationId)}
                    style={{
                      cursor: "pointer",
                      marginBottom: "8px",
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                      listStyle: "none",
                    }}
                  >
                    <strong>{item.stationName}</strong>
                    <div style={{ fontSize: "0.9rem", color: "#555" }}>
                      {item.address}
                    </div>
                  </li>
                );
              })}
          </ol>
        </SearchResult>
      </LeftSection>

      {/* 오른쪽 : 지도 + 리뷰 + 페이지네이션 */}
      <RightSection>
        <Map id="map" style={{ width: "100%", height: "420px" }}></Map>
        {location && <div></div>}
        <div style={{ marginTop: "15px" }}>
          선택된 충전소 이름 : {stationName}
        </div>
        <DetailButton
          onClick={findAll}
          style={{ marginTop: "5%", width: "10%" }}
        >
          조회하기
        </DetailButton>

        {refresh.map((e) => (
          <li
            key={e.reviewId}
            style={{
              display: "flex",
              gap: "20px",
              listStylePosition: "inside",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "0.5", textAlign: "center" }}>
              <p
                style={{
                  background:
                    e.recommend === "추천" || e.recommend === "Y"
                      ? "#1abfb1"
                      : "#992b2b",
                  color: "#fff",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  display: "inline-block",
                }}
              >
                {e.recommend === "Y"
                  ? "추천"
                  : e.recommend === "N"
                  ? "비추천"
                  : e.recommend}
              </p>
            </div>
            <div style={{ flex: "4" }}>
              <p> {e.commentContent}</p>
            </div>
            <div style={{ flex: "4" }}>
              <p> 작성일:{e.createdAt}</p>
            </div>
            <div style={{ flex: "3" }}>
              {currentUserNo && String(e.userNo) === String(currentUserNo) ? (
                <Elision
                  onClick={() => elision(e.reviewId)}
                  style={{ marginTop: "0px" }}
                >
                  삭제
                </Elision>
              ) : null}
            </div>
          </li>
        ))}

        <Review
          style={{
            marginTop: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Recomend
            onClick={() => setIsRecomend("Y")}
            className={isRecomend === "Y" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            추천
          </Recomend>
          <Recomend
            onClick={() => setIsRecomend("N")}
            className={isRecomend === "N" ? "dislike" : ""}
            style={{ cursor: "pointer" }}
          >
            비추천
          </Recomend>
          <Comment
            value={comment}
            placeholder="    남기고 싶은 리뷰를 입력하세요."
            maxLength={80}
            onChange={(e) => setComment(e.target.value)}
            style={{ flex: 1 }}
          />
          <Registration onClick={register} style={{ marginLeft: "8px" }}>
            등록
          </Registration>
        </Review>
      </RightSection>
    </MainContainer>
  );
};

export default Station;
