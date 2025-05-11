"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function LocationMarker({ onAddSpot }) {
  useMapEvents({
    click(e) {
      onAddSpot(e.latlng);
    },
  });
  return null;
}

export default function Map({ spots, onAddSpot, newSpot }) {
  return (
    <MapContainer
      center={[47.9212, 106.9186]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot) => (
        <Marker
          key={spot._id}
          position={[spot.coordinates.lat, spot.coordinates.lng]}
        >
          <Popup>
            <Link href={`/spot/${spot._id}`}>{spot.title}</Link>
            <br />
            {spot.image && (
              <img
                src={`${BACKEND_URL}${spot.image}`} // Correct URL
                alt={spot.title}
                style={{ width: "100px" }}
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            )}
          </Popup>
        </Marker>
      ))}
      {newSpot && (
        <Marker position={[newSpot.lat, newSpot.lng]}>
          <Popup>
            <Link href={`/create?lat=${newSpot.lat}&lng=${newSpot.lng}`}>
              Add new spot here
            </Link>
          </Popup>
        </Marker>
      )}
      <LocationMarker onAddSpot={onAddSpot} />
    </MapContainer>
  );
}

/*
"use client"; // Required for App Router; optional for Pages Router but good practice
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

function LocationMarker({ onAddSpot }) {
  useMapEvents({
    click(e) {
      onAddSpot(e.latlng);
    },
  });
  return null;
}

export default function Map({ spots, onAddSpot, newSpot }) {
  return (
    <MapContainer
      center={[47.9212, 106.9186]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot) => (
        <Marker
          key={spot._id}
          position={[spot.coordinates.lat, spot.coordinates.lng]}
        >
          <Popup>
            <Link href={`/spot/${spot._id}`}>{spot.title}</Link>
            <br />
            {spot.image && (
              <img
                src={spot.image}
                alt={spot.title}
                style={{ width: "100px" }}
              />
            )}
          </Popup>
        </Marker>
      ))}
      {newSpot && (
        <Marker position={[newSpot.lat, newSpot.lng]}>
          <Popup>
            <Link href={`/create?lat=${newSpot.lat}&lng=${newSpot.lng}`}>
              Add new spot here
            </Link>
          </Popup>
        </Marker>
      )}
      <LocationMarker onAddSpot={onAddSpot} />
    </MapContainer>
  );
}
*/
