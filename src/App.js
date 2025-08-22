import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PacientesPage from './pages/PacientesPage';
import TurnosPage from './pages/TurnosPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import RutaPrivada from './components/RutaPrivada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inicio" element={<RutaPrivada><HomePage /></RutaPrivada>} />
        <Route path="/pacientes" element={<RutaPrivada><PacientesPage /></RutaPrivada>} />
        <Route path="/turnos" element={<TurnosPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
