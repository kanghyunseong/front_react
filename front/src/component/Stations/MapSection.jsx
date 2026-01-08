import {
  MapContainer,
  MapContent,
  StationInfoBar,
  MapOverlayText,
} from "./MapSection.style";
import { useEffect } from "react";

const MapSection = ({
  location,
  positions,
  stationName,
  mapRef,
  setStationId,
  setStationName,
}) => {
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

    // 1. 내 위치 마커 (사용자 아이콘 등으로 변경 가능)
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const myMarker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    myMarker.setMap(map);

    // 2. 충전소 마커 이미지 설정
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 3. 충전소 마커 생성 및 이벤트 바인딩
    positions.forEach((item) => {
      if (!item.latlng) return;

      const stationMarker = new window.kakao.maps.Marker({
        map: map,
        position: item.latlng,
        title: item.title,
        image: markerImage,
      });

      // 마커 클릭 시 정보 업데이트
      window.kakao.maps.event.addListener(stationMarker, "click", () => {
        setStationId(item.stationId);
        setStationName(item.title);
      });
    });

    // 4. 지도 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 5. 주변 반경 표시 (5km -> 사용자 가독성을 위해 투명도 조정)
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lng),
      radius: 5000,
      strokeWeight: 2,
      strokeColor: "#4dabf7",
      strokeOpacity: 0.6,
      strokeStyle: "dashed",
      fillColor: "#e7f5ff",
      fillOpacity: 0.2,
    });
    circle.setMap(map);
  }, [location, positions, mapRef, setStationId, setStationName]);

  return (
    <MapContainer>
      <MapOverlayText>📍 현재 위치 중심 검색 결과</MapOverlayText>

      {/* 지도 영역 */}
      <MapContent id="map" />

      {/* 선택된 충전소 정보 표시 영역 */}
      <StationInfoBar>
        {stationName ? (
          <>
            선택된 충전소: <strong>{stationName}</strong>
          </>
        ) : (
          <span style={{ color: "#adb5bd" }}>
            지도에서 충전소 마커를 클릭해주세요.
          </span>
        )}
      </StationInfoBar>
    </MapContainer>
  );
};

export default MapSection;
