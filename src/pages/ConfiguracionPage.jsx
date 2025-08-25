import React, {useEffect, useState} from 'react';
import { fetchConToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { colours } from '../constants/colours'
import Button from '../components/Button';

const ConfiguracionPage = () => {
    const [ profesional, setProfesional] = useState(null);
    const navigate = useNavigate();
    const profesionalId = localStorage.getItem('profesionalId');

    useEffect (() => {
        const cargarDatos = async () => {
            try{
                const data = await fetchConToken(`profesionales/${profesionalId}`);
                setProfesional(data);
            }
            catch (error) {
                console.error('Error al cargar los datos del profesional: ', error);
            }
        };
        
        if (profesionalId) {
            cargarDatos();
        }
    }, [profesionalId]);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profesionalId');
        navigate('/');
    };

    return (
    <div style={styles.container}>
          <h2 style={styles.title}>Configuración</h2>
          {profesional ? (
            <div style={styles.card}>
              <p><strong>Nombre:</strong> {profesional.nombre}</p>
              <p><strong>DNI:</strong> {profesional.dni}</p>
              <p><strong>Matrícula:</strong> {profesional.matricula}</p>
              <p><strong>Título:</strong> {profesional.titulo}</p>
            </div>
          ) : (
            <p style={styles.loading}>Cargando datos...</p>
          )}
          <div style={styles.actions}>
            <Button variant="primary" onClick={cerrarSesion}>Cerrar sesión</Button>
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
    alignItems: 'center',
    gap: '24px',
  },
  title: {
    fontSize: '28px',
    color: colours.text,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colours.primary,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: colours.background,
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  loading: {
    color: colours.text,
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default ConfiguracionPage;