import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getPictureSpots } from "../lib/api";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("../components/Map"), {
  ssr: false, // Disable SSR for this component
});

export default function Home() {
  const [spots, setSpots] = useState([]);
  const [newSpot, setNewSpot] = useState(null);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const data = await getPictureSpots();
        setSpots(data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    }
    fetchSpots();
  }, []);

  const handleAddSpot = (latlng) => {
    setNewSpot(latlng);
  };

  /*  return (
    <div style={{ padding: "20px" }}>
      <h1>Picture Spot Map</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Map spots={spots} onAddSpot={handleAddSpot} newSpot={newSpot} />
      <h2>Spots</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot._id}>
            <Link href={`/spot/${spot._id}`}>{spot.title}</Link>
            {spot.image && (
              <img
                src={`${BACKEND_URL}${spot.image.replace(
                  "/uploads/",
                  "/Uploads/"
                )}`} // Ensure capital U
                alt={spot.title}
                style={{ width: "50px" }}
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

*/ return (
    <div style={{ padding: "30px" }}>
      <h1>Peported Issues</h1>
      <Map spots={spots} onAddSpot={handleAddSpot} newSpot={newSpot} />
      <h2>Spots</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot._id}>
            <Link href={`/spot/${spot._id}`}>{spot.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
