import React, { useEffect, useState } from 'react';
import { fetchConToken } from '../services/api';
import FormularioPaciente from '../components/FormularioPaciente';
import { colours } from '../constants/colours';
import Button from '../components/Button';
import PacienteCard from '../components/PacienteCard';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const cargarPacientes = async () => {
      try {
        const data = await fetchConToken('pacientes');
        setPacientes(data);
      } catch (err) {
        setError('Error al cargar pacientes');
        console.error(err);
      }
    };

  const onEditar = (paciente) => {
    setPacienteEditando(paciente);
    setMostrarFormulario(true);
  };
  
  useEffect(() => {
    cargarPacientes();
  }, []);

  
  const handlePacienteCreado = () => {
      setMostrarFormulario(false);
      setPacienteEditando(null);
      cargarPacientes();
    };

  return (  
    <div style={styles.container}>
      <h2 style={styles.title}>Pacientes</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.content}>
        {mostrarFormulario ? (
          <div style={styles.listSection}>
            <FormularioPaciente 
              onPacienteCreado={handlePacienteCreado} 
              paciente={pacienteEditando}
            />
          </div>
        ) : (
          <div style={styles.listSection}>
            <h3 style={styles.subtitle}>Listado de pacientes</h3>
            <ul style={styles.list}>
              {pacientes.map((paciente) => (
                <li key={paciente.id} style={styles.card}>
                  <PacienteCard paciente={paciente} onEditar={() => onEditar(paciente)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div style={styles.actions}>
        <Button variant="primary" onClick={() => {setMostrarFormulario(!mostrarFormulario); setPacienteEditando(null);}}>
          {mostrarFormulario ? 'Cancelar' : 'Crear paciente'}
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
  title: {
    fontSize: '28px',
    color: colours.text,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formSection: {
    backgroundColor: colours.primary,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '90%', 
    maxWidth: '1000px',
    margin: '0 auto',
    justifyContent: 'center',
  },
  listSection: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: colours.primary,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: '20px',
    color: colours.background,
    marginBottom: '16px',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    backgroundColor: colours.secondary,
    padding: '12px',
    borderRadius: '8px',
    color: colours.text,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
};


export default PacientesPage;

