import React from 'react';
import { colours } from '../constants/colours';
import Button from './Button';

const TurnoCard = ({ turno, onEditar, onEliminar }) => {
  const fecha = new Date(turno.fecha_hora);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const horaFormateada = fecha.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={styles.card}>
        <div style={styles.info}>
            <div style={styles.fecha}>{fechaFormateada} | {horaFormateada}</div>
            <div style={styles.nombre}>{turno.Paciente.nombre}</div>
            <div style={styles.tipo}>{turno.tipo === 'domicilio' ? 'A domicilio' : 'En consultorio'}</div>
        </div>
        <div style={styles.actions}> 
        <Button variant="secondary" onClick={() => onEditar(turno)}>Editar</Button>
        <Button variant="secondary" onClick={() => onEliminar(turno.id)}>Eliminar</Button>
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
    gap: '12px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fecha: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  nombre: {
    fontSize: '15px',
  },
  tipo: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: colours.accent,
  },
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
};


export default TurnoCard;
