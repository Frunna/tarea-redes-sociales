import React, { useEffect, useState } from "react";
import "./Commune.css";

export const Commune = () => {
  const [communes, setCommunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommune, setSelectedCommune] = useState(null);

  useEffect(() => {
    const getCommuneData = async () => {
      const start = Date.now();
      try {
        const result = await fetch("http://localhost:3000/api/communes");
        const information = await result.json();
        setCommunes(information);
      } catch (error) {
        console.error("Error al cargar comunas:", error);
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(1500 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };

    getCommuneData();
  }, []);

  if (loading) return <div className="loading">Cargando comunas...</div>;

  return (
    <div className="container-commune">
      <select
        className="commune-select"
        onChange={(e) => {
          const comuna = communes.find(c => c.id === e.target.value);
          setSelectedCommune(comuna);
        }}
      >
        <option value="">Seleccione una comuna</option>
        {communes.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {selectedCommune && (
        <div className="commune-card fade-in-up">
          <h2>{selectedCommune.name}</h2>
          <p><strong>Provincia:</strong> {selectedCommune.province}</p>
          <p><strong>Dirección:</strong> {selectedCommune.address}</p>
          <p><strong>Alcalde:</strong> {selectedCommune.mayor}</p>
          <p><strong>Superficie:</strong> {selectedCommune.surface}</p>
          <p><strong>Población:</strong> {selectedCommune.population}</p>
        </div>
      )}
    </div>
  );
};
