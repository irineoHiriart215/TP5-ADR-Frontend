import React, { useState, useEffect } from 'react';
import { fetchConToken } from '../services/api';
import FormularioTurno from '../components/FormularioTurno';
import { colours } from '../constants/colours';
import Button from '../components/Button';
import TurnoCard from '../components/TurnoCard';

const HomePage = () => {
  const [ turnos, setTurnos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const profesional_id = localStorage.getItem('profesionalId');
  
  const cargarTurnos = async() => {
    try {
      const data = await fetchConToken(`turnos/prof/${profesional_id}`);
      setTurnos(data);
    }
    catch (error) {
      console.error('Error al cargar turnos:', error);
    }
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  return (
    
<div style={styles.container}>
      <h2 style={styles.title}>Inicio</h2>

      <nav style={styles.nav}>
        <Button variant="secondary" onClick={() => window.location.href = '/configuracion'}>
          Configuración
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = '/pacientes'}>
          Pacientes
        </Button>
      </nav>
      
      <div style={styles.content}>
        {mostrarFormulario && (
          <div style={styles.formSection}>
            <h3 style={styles.subtitle}>Crear nuevo turno</h3>
            <FormularioTurno onTurnoCreado={cargarTurnos} />
          </div>
        )}

        <div style={styles.turnosSection}>
          <h3 style={styles.subtitle}>Turnos programados</h3>
          <ul style={styles.turnosList}>
            {turnos.map((turno) => (
              <li key={turno.id}>
                <TurnoCard
                  turno={turno}
                  onEditar={(t) => console.log('Editar turno:', t)}
                  onEliminar={(id) => console.log('Eliminar turno con ID:', id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
       <div style={styles.actions}>
        <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Ocultar formulario' : 'Agregar turno'}
        </Button>
      </div>
    </div>

  );
};


const styles = {
  container: {
    backgroundColor: colours.background,
    minHeight: '100vh',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },
  title: {
    fontSize: '28px',
    color: colours.text,
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  formSection: {
    backgroundColor: colours.primary,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    flex: '1',
    minWidth: '300px',
  },
  turnosSection: {
    backgroundColor: colours.primary,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    flex: '1',
    minWidth: '300px',
  },
  subtitle: {
    fontSize: '20px',
    color: colours.background,
    marginBottom: '16px',
  },
  turnosList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  turnoItem: {
    backgroundColor: colours.secondary,
    padding: '12px',
    borderRadius: '8px',
    color: colours.text,
  },
};


export default HomePage;
