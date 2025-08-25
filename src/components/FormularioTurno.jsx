import React, {useState, useEffect} from 'react';
import { fetchConToken } from '../services/api';
import { colours } from '../constants/colours';
import Input from './Input';
import Button from './Button';

const FormularioTurno = ({ onTurnoCreado }) =>{
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [pacienteId, setPacienteId] = useState('');
    const [tipo, setTipo] = useState('consultorio');
    const [pacientes, setPacientes] = useState([]);
    const [ motivo, setMotivo] = useState('');
    const profesionalId = localStorage.getItem('profesionalId');

    useEffect (() => {
        const cargarPacientes = async () => {
            const data = await fetchConToken('pacientes');
            setPacientes(data);
        };
        cargarPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoTurno = {
            fecha: fecha,
            hora: hora,
            paciente_id: pacienteId,
            tipo,
            profesional_id: profesionalId,
            motivo,
        };

        try {
            await fetchConToken('turnos','POST', nuevoTurno);
            if (onTurnoCreado) onTurnoCreado();
            setFecha('');
            setHora('');
            setPacienteId('');
            setTipo('consultorio');
            setMotivo('');
        }
        catch (error) {
            console.error('Error al crear turno:', error);
        }
    };

return (  
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Crear nuevo turno</h3>
      <Input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <Input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
      />

      <select value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} required style={styles.select}>
        <option value="">Seleccionar paciente</option>
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={styles.select}>
        <option value="consultorio">Consultorio</option>
        <option value="domicilio">Domicilio</option>
      </select>
      <Input
        type="text"
        placeholder="Motivo del turno"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        required
      />
      <Button type="submit">Crear turno</Button>
    </form>
    );
};

const styles = {
  form: {
    backgroundColor: colours.primary,
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '60%',
    margin:'0 auto',
  },
  title: {
    fontSize: '20px',
    color: colours.background,
    marginBottom: '12px',
    textAlign: 'center',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: `1px solid ${colours.accent}`,
    backgroundColor: colours.secondary,
    color: colours.text,
    fontSize: '14px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12px',
  },
};

export default FormularioTurno;