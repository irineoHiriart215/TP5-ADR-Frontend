import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegistroPage';
import HomePage from './pages/HomePage';
import PacientesPage from './pages/PacientesPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import RutaPrivada from './components/RutaPrivada';
import Headbar from './components/headbar';

function App() {
  const location = useLocation();
  const mostrarHeadbar = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {mostrarHeadbar && <Headbar/>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/inicio" element={<RutaPrivada><HomePage /></RutaPrivada>} />
        <Route path="/pacientes" element={<RutaPrivada><PacientesPage /></RutaPrivada>} />
        <Route path="/configuracion" element={<RutaPrivada><ConfiguracionPage /></RutaPrivada>} />
      </Routes>
    </>
  );
}

export default App;
