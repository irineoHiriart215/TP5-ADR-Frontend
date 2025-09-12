import React, { useEffect, useState } from 'react';
import { fetchConToken } from '../services/api';
import FormularioOS from '../components/FormularioOS';
import { colours } from '../constants/colours';
import Button from '../components/Button';
import OSCard from '../components/OSCard';

const OSPage = () => {
  const [obrasSociales, setOS] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [OSeditando, setOSEditando] = useState(null);

  const cargarOS = async () => {
      try {
        const data = await fetchConToken('obras-sociales');
        setOS(data);
      } catch (err) {
        setError('Error al cargar obras sociales');
        console.error(err);
      }
    };

  const onEditar = (OS) => {
    setOSEditando(OS);
    setMostrarFormulario(true);
  };
  
  useEffect(() => {
    cargarOS();
  }, []);

  
  const handleOSCreado = () => {
      setMostrarFormulario(false);
      setOSEditando(null);
      cargarOS();
    };

  return (  
    <div style={styles.container}>
      <h2 style={styles.title}>Obras sociales</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.content}>
        {mostrarFormulario ? (
          <div style={styles.listSection}>
            <FormularioOS
              onOSCreado={handleOSCreado} 
              OS={OSeditando}
            />
          </div>
        ) : (
          <div style={styles.listSection}>
            <h3 style={styles.subtitle}>Listado de obras sociales</h3>
            <ul style={styles.list}>
              {obrasSociales.map((OS) => (
                <li key={OS.id} style={styles.card}>
                  <OSCard OS={OS} onEditar={() => onEditar(OS)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div style={styles.actions}>
        <Button variant="primary" onClick={() => {setMostrarFormulario(!mostrarFormulario); setOSEditando(null);}}>
          {mostrarFormulario ? 'Cancelar' : 'Crear obra social'}
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


export default OSPage;

