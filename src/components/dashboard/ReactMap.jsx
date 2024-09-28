import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { getCoordinates } from "../../../utils/reactMap";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import location from "../../app/favicon.ico";
import { BiLocationPlus } from "react-icons/bi";
const ReactMap = ({ data }) => {
  const [latLong, setLatLong] = useState([]);
  const [done, setDone] = useState(false);
  async function getLatLong(postalCode) {
    let response = getCoordinates(postalCode, "Belgium");
    return response;
  }

  useEffect(() => {
    if (latLong != []) {
      let latLongs = [];
      if (data) {
        [...data].forEach((value, index, array) => {
          getLatLong(value.main_address_postalCode).then((d) =>
            setLatLong((prevState) => [
              ...prevState,
              { lat: d.lat, lon: d.lon, client: value },
            ])
          );
        });
      }
      setDone(true);
    }
  }, []);
  return done == true && latLong[0] ? (
    <MapContainer
      center={[latLong[0]?.lat, latLong[0]?.lon]}
      zoom={17}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {latLong.map((co) => (
        <Marker
          position={[co.lat, co.lon]}
          icon={
            new Icon({
              iconUrl:
                "https://media.istockphoto.com/id/1148705812/vector/location-icon-vector-pin-sign-isolated-on-white-background-navigation-map-gps-direction.jpg?s=612x612&w=0&k=20&c=lqEIzW3QedZfytsX30NoBJbHxZZbWnlLsvEiwOSbaow=",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <div>
              <h1>Client Information</h1>
              <ul>
                <li>
                  <strong>Code:</strong> {co.client.code}
                </li>
                <li>
                  <strong>Name:</strong> {co.client.name}
                </li>
                <li>
                  <strong>Address Line 1:</strong>{" "}
                  {co.client.main_address_addressLine1}
                </li>

                <li>
                  <strong>City:</strong> {co.client.main_address_city}
                </li>
                <li>
                  <strong>Country:</strong> {co.client.main_address_country}
                </li>
                <li>
                  <strong>Postal Code:</strong>{" "}
                  {co.client.main_address_postalCode}
                </li>
              </ul>
            </div>
            export default ClientInfo;
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <>{JSON.stringify(latLong)}</>
  );
};

export default ReactMap;
