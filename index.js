import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const file = image;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "foodie");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dq3ide9de/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );
    const data = await res.json();
    setUrl(data.secure_url);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Subir imagen a Cloudinary</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </form>
      {url && (
        <div style={{ marginTop: 20 }}>
          <h3>Imagen subida:</h3>
          <img src={url} alt="Subida" style={{ maxWidth: 400 }} />
          <p>
            <a href={url} target="_blank" rel="noopener noreferrer">Ver / Descargar imagen</a>
          </p>
        </div>
      )}
    </div>
  );
}