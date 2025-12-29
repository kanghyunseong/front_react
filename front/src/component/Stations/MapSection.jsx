import { Map } from "./MapSection.style";
import { useEffect } from "react";

/**
 * MapSection - 지도 컴포넌트 (오른쪽 상단)
 *
 * Props:
 * - location: 사용자 현재 위치 {latitude, longitude}
 * - positions: 충전소 위치 배열
 * - stationName: 선택된 충전소 이름 (string)
 * - mapRef: 카카오맵 ref 객체
 * - setStationId: 충전소 ID 업데이트 함수
 * - setStationName: 충전소 이름 업데이트 함수
 */
const MapSection = ({
  location, // Props: 사용자 위치 {latitude, longitude}
  positions, // Props: 충전소 위치 배열
  stationName, // Props: 선택된 충전소 이름
  mapRef, // Props: 지도 ref
  setStationId, // Props: 충전소 ID 업데이트 함수
  setStationName, // Props: 충전소 이름 업데이트 함수
}) => {
  // ===========================
  // 지도 초기화 useEffect
  // ===========================
  useEffect(() => {
    if (!location || !positions || positions.length === 0) return;
    if (!window.kakao || !window.kakao.maps) return;

    const { latitude: lat, longitude: lng } = location;

    // 지도 생성
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

    // 충전소 마커 이미지
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 충전소 마커 생성
    for (let i = 0; i < positions.length; i++) {
      const item = positions[i];
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

      // 마커 클릭 이벤트 - 충전소 선택
      window.kakao.maps.event.addListener(stationMarker, "click", () => {
        const selectedId = item.stationId;
        setStationId(selectedId);
        setStationName(item.title);
      });
    }

    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 반경 5km 원 표시
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
  }, [location, positions, mapRef, setStationId, setStationName]);

  // ===========================
  // 렌더링
  // ===========================
  return (
    <>
      {/* 카카오맵 표시 영역 */}
      <Map id="map" style={{ width: "100%", height: "420px" }}></Map>
      {location && <div></div>}

      {/* 선택된 충전소 이름 표시 */}
      <div style={{ marginTop: "15px" }}>
        선택된 충전소 이름 : {stationName}
      </div>
    </>
  );
};

export default MapSection;
