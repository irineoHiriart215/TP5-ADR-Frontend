import React from 'react';
import { colours } from '../constants/colours';
import Button from './Button';

const PacienteCard = ({ OS, onEditar}) => {
  return (
    <div style={styles.card}>
      <div style={styles.nombre}>{OS.nombre}</div>
      <div style={styles.info}>Teléfono: {OS.telefono}</div>
      <div style={styles.info}>Dirección: {OS.email}</div>
      <div style={styles.actions}> 
        <Button variant="secondary" onClick={() => onEditar(OS)}>Editar</Button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: colours.secondary,
    padding: '16px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    color: colours.text,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  info: {
    fontSize: '14px',
  },
  observaciones: {
    fontSize: '13px',
    fontStyle: 'italic',
    color: colours.accent,
  },
   actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
};

export default PacienteCard;
