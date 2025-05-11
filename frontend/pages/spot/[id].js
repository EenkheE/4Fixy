import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPictureSpotById } from "../../lib/api";
import styles from "../../styles/SpotDetail.module.css";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function SpotDetail() {
  const [spot, setSpot] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchSpot() {
        try {
          const data = await getPictureSpotById(id);
          console.log("Fetched spot:", data); // Log spot data
          setSpot(data);
        } catch (error) {
          console.error("Error fetching spot:", error);
          setError("Failed to load spot details");
        }
      }
      fetchSpot();
    }
  }, [id]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!spot) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{spot.title}</h1>
      <p>
        <strong>Description:</strong> {spot.description || "No description"}
      </p>
      <p>
        <strong>Location:</strong> ({spot.coordinates.lat},{" "}
        {spot.coordinates.lng})
      </p>
      {spot.image ? (
        <div>
          <strong>Image:</strong>
          <br />
          <img
            src={`${BACKEND_URL}${spot.image}`}
            alt={spot.title}
            style={{ maxWidth: "300px" }}
            onError={(e) => {
              console.error(
                "Image failed to load:",
                `${BACKEND_URL}${spot.image}`
              );
              e.target.src = "/default-avatar.png";
            }}
          />
        </div>
      ) : (
        <div>
          <strong>Image:</strong> No image available
          <img
            src="/default-avatar.png"
            alt="Default"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
      <button onClick={() => router.push("/")}>Return to Map</button>
    </div>
  );
}
