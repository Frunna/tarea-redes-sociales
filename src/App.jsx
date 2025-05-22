import { useState } from "react";
import "./App.css";
import { Indicators } from "./indicators/Indicators";
import { Commune } from "./communes/Commune";

function App() {
  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <div>

      <h1 className="main-title">Plataforma de Información Comunal</h1>

      <p className="subtitle"> </p>

      <header className="header">
        <nav>
          <button
            onClick={() => setActiveBtn(0)}
            className={`btn-nav ${activeBtn === 0 ? "active" : ""}`}
          >Comunas </button>

          <button
            onClick={() => setActiveBtn(1)}
            className={`btn-nav ${activeBtn === 1 ? "active" : ""}`}
          >Indicadores </button>
          
        </nav>
      </header>

      <div className="content">
        {activeBtn === 0 ? <Commune /> : <Indicators />}
      </div>
        <footer className="footer">
           <p>Hecho con 💚 por Lizeth Soler y Fernanda Vidal -2025 </p>
        </footer>

    </div>
  );
}

export default App;
