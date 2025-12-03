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
import { useEffect, useState, useContext } from "react"; // 이 줄이 있는지 확인!
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { DetailButton } from "../Cars/CarsSearchList.style";

const Station = () => {
  // ===========================
  // 1. State 정의
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
    document.querySelector("#searchResult").style.background = "none";
    axios
      .get("http://localhost:8081/station/search", {
        params: { keyword: keyword },
      })
      .then((response) => {
        const result = response.data;
        // 가공
        const mapped = result.map((e) => {
          return {
            stationId: e.stationId,
            stationName: e.stationName,
            address: e.address,
            lat: e.latitude,
            lng: e.longitude,
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
      });
  };

  const handleResultClick = (stationId) => {
    console.log(stationId);
    axios
      .get(`http://localhost:8081/station/searchDetail/${stationId}`)
      .then((res) => {
        const station = res.data[0]; // 배열 안 첫 번째 객체
        const {
          address,
          detailAddress,
          regDate,
          stationId,
          stationName,
          tel,
          useTime,
        } = station;
        alert(
          "주소:" +
            address +
            "\n상세주소:" +
            detailAddress +
            "\n등록일자:" +
            regDate +
            "\n충전소ID:" +
            stationId +
            "\n충전소 이름:" +
            stationName +
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
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
        setIsRecomend(null);
        setComment("");
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 주었을 때
          if (error.response.status === 400) {
            alert("로그인부터 해주세요");
          } else if (
            error.response.data &&
            error.response.data["error-message"]
          ) {
            alert(error.response.data["error-message"]);
          } else {
            alert("오류가 발생했습니다.");
          }
        } else if (error.request) {
          // 요청은 되었지만 응답이 없을 때
          alert("서버가 응답하지 않습니다.");
        } else {
          // 그 외 오류
          alert("오류: " + error.message);
        }
      });
  };

  const elision = (reviewId) => {
    console.log(reviewId);
    axios
      .delete("http://localhost:8081/station", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        data: { reviewId: reviewId }, // data 객체로 감싸기
      })
      .then((response) => {
        alert(response.data);
        findAll();
      })
      .catch((error) => {
        alert(error.response.data["error-message"]);
      });
  };

  const findAll = () => {
    console.log(stationId);
    axios
      .get(`http://localhost:8081/station/findAll?stationId=${stationId}`)
      .then((response) => {
        console.log(response);
        setRefresh(response.data);
      });
  };
  // 3. 위치 정보 + 지도 + 마커 세팅 (useEffect)
  useEffect(() => {
    // 이 부분 추가!
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
              const selectedId = item.stationId; // 이 마커에 해당하는
              const selectedName = item.title;

              setStationId(selectedId);

              setStationName(selectedName);

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
          />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchWrapper>
        <SearchResult id="searchResult">
          <ol>
            {searchResult &&
              searchResult.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleResultClick(item.stationId)}
                    style={{ cursor: "pointer", marginBottom: "8px" }}
                  >
                    <strong>{item.title}</strong>
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
              listStylePosition: "inside", // 또는 아래 방법들 참고
              marginTop: "20px",
            }}
          >
            <div style={{ flex: "0.5", textAlign: "center" }}>
              <p
                style={{
                  background: e.recommend === "추천" ? "#1abfb1" : "#992b2b",
                }}
              >
                {e.recommend}
              </p>
            </div>
            <div style={{ flex: "4" }}>
              <p> {e.commentContent}</p>
            </div>
            <div style={{ flex: "4" }}>
              <p> 작성일:{e.createdAt}</p>
            </div>
            <div style={{ flex: "3" }}>
              <Elision
                onClick={() => elision(e.reviewId)}
                style={{ marginTop: "0px" }}
              >
                삭제
              </Elision>
            </div>
          </li>
        ))}

        <Review>
          <Recomend
            onClick={() => setIsRecomend("Y")}
            className={isRecomend === "Y" ? "active" : ""}
          >
            추천
          </Recomend>
          <Recomend
            onClick={() => setIsRecomend("N")}
            className={isRecomend === "N" ? "dislike" : ""}
          >
            비추천
          </Recomend>
          <Comment
            value={comment}
            placeholder="    남기고 싶은 리뷰를 입력하세요."
            maxLength={80}
            onChange={(e) => setComment(e.target.value)}
          />
          <Registration onClick={register}>등록</Registration>
        </Review>
      </RightSection>
    </MainContainer>
  );
};

export default Station;
