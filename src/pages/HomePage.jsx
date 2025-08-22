import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Bienvenido al sistema de gestión</h2>
      <nav>
        <ul>
          <li><Link to="/configuracion">Configuración</Link></li>
          <li><Link to="/pacientes">Pacientes</Link></li>
          <li><Link to="/turnos">Turnos</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
