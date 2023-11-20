import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = ({ location }) => {
  const { lat, lon, zoom, name } = location;

  console.log("lattitude", lat);

  const customIcon = new Icon({
    iconUrl: "	https://cdn-icons-png.flaticon.com/512/9101/9101314.png",
    iconSize: [38, 38], // size of the icon
  });

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={zoom}
      key={`${lat}-${lon}`}
      style={{ height: "700px", width: "50vw", borderRadius: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]} icon={customIcon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
