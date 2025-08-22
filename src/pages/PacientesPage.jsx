import React, { useEffect, useState } from 'react';
import { fetchConToken } from '../services/api';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const data = await fetchConToken('pacientes');
        setPacientes(data);
      } catch (err) {
        setError('Error al cargar pacientes');
        console.error(err);
      }
    };

    cargarPacientes();
  }, []);

  return (
    <div>
      <h2>Pacientes</h2>
      {error && <p>{error}</p>}
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            {paciente.nombre} - DNI: {paciente.dni}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacientesPage;

