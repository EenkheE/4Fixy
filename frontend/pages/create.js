import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createPictureSpot } from "../lib/api";

export default function CreateSpot() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    lat: "",
    lng: "",
    image: null,
  });
  const router = useRouter();
  const { lat, lng } = router.query;

  useEffect(() => {
    if (lat && lng) {
      setForm((prev) => ({ ...prev, lat, lng }));
    }
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.title ||
      form.lat < -90 ||
      form.lat > 90 ||
      form.lng < -180 ||
      form.lng > 180
    ) {
      alert(
        "Please enter a valid title and coordinates (Lat: -90 to 90, Lng: -180 to 180)"
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);
    if (form.image) formData.append("image", form.image);

    try {
      await createPictureSpot(formData);
      router.push("/");
    } catch (error) {
      console.error("Error creating spot:", error);
      alert("Failed to create spot");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Report Infrastructure Issue</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue Title:</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>What is broken? Please write detail comment:</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>
        <button type="submit">Submit Report and Create Spot</button>
      </form>
    </div>
  );
}
