import { Map } from "./MapSection.style";
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

    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const myMarker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    myMarker.setMap(map);

    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

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

      window.kakao.maps.event.addListener(stationMarker, "click", () => {
        const selectedId = item.stationId;
        setStationId(selectedId);
        setStationName(item.title);
      });
    }

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

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

  return (
    <>
      <Map id="map" style={{ width: "100%", height: "420px" }}></Map>
      {location && <div></div>}

      <div style={{ marginTop: "15px" }}>
        선택된 충전소 이름 : {stationName}
      </div>
    </>
  );
};

export default MapSection;
