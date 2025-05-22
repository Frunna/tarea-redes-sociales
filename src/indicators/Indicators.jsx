import React, { useEffect, useState } from "react";
import "./Indicators.css";

export const Indicators = () => {
  const [indicators, setIndicators] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllIndicators = async () => {
    try {
      const star =Date.now();
      const data = await fetch ("http://localhost:3000/api/indicator");
      const indicatorName = await data.json();
      setIndicators(indicatorName);

      const elapsed = Date.now() - startTransition;
      const delay = Math.max(1500 - elapsed, 0);
      setTimeout(() => setLoading(false),delay);
    } catch (error){
      console.error("Error al cargar indicadores:", error);
      setLoading(false);
    }
  };

  const getIndicatorData = async (id) => {
    const data = await fetch(`http://localhost:3000/api/indicator/${id}`);
    const indicatorData = await data.json();
    setIndicatorData(indicatorData);
  };

  useEffect(() => {
    getAllIndicators();
  },[]);

  if (loading) {
    return <div className="loading">Cargando indicadores...</div>;
  }

  return (
    <div className="container-indicators">
      <div className="sidebar">
        {indicators.map((i) => (
          <button key={i.id} onClick={() => getIndicatorData(i.id)}>
            {i.name}
          </button>
        ))}
      </div>
      <div className="indicator-information">
        {indicatorData.map((i) => (
          <div key={i.idCommune} className="indicator-card fade-in-up">
            <h3>{i.commune}</h3>
            <p><strong>Valor:</strong> {i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
