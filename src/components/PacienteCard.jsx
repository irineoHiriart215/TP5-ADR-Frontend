import React from 'react';
import { colours } from '../constants/colours';
import Button from './Button';

const PacienteCard = ({ paciente, onEditar, onEliminar }) => {
const fecha = new Date(paciente.fecha_nacimiento);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <div style={styles.card}>
      <div style={styles.nombre}>{paciente.nombre}</div>
      <div style={styles.info}>DNI: {paciente.dni}</div>
      <div style={styles.info}>Fecha de nacimiento: {fechaFormateada}</div>
      <div style={styles.info}>Teléfono: {paciente.telefono}</div>
      <div style={styles.info}>Email: {paciente.email}</div>
      <div style={styles.info}>Obra Social: {paciente.ObraSocial?.nombre || 'Sin obra social'}</div>
      {paciente.observaciones && (
        <div style={styles.observaciones}>Observaciones: {paciente.observaciones}</div>
      )}
      <div style={styles.actions}> 
        <Button variant="secondary" onClick={() => onEditar(paciente)}>Editar</Button>
        <Button variant="secondary" onClick={() => onEliminar(paciente.id)}>Eliminar</Button>
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
