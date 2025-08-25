import React, {useState, useEffect} from 'react';
import { fetchConToken } from '../services/api';
import { colours } from '../constants/colours';
import Input from './Input';
import Button from './Button';

const FormularioPaciente= ({ onPacienteCreado }) =>{
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [fecha_nacimiento, setFechaNac] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [obra_social_id, setObraSocialId] = useState('');
    const [OS, setOS] = useState([]);

    useEffect (() => {
        const cargarOS = async () => {
            const data = await fetchConToken('obras-sociales');
            setOS(data);
        };
        cargarOS();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoPaciente = {
            nombre,
            dni,
            fecha_nacimiento,
            telefono,
            email,
            observaciones,
            obra_social_id,
        };

        try {
            await fetchConToken('pacientes','POST', nuevoPaciente);
            if (onPacienteCreado) onPacienteCreado();
            setNombre('');
            setDni('');
            setTelefono('')
            setEmail('');
            setFechaNac('');
            setTelefono();
            setEmail('');
        }
        catch (error) {
            console.error('Error al crear paciente', error);
        }
    };

return (  
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Crear nuevo paciente</h3>

      <Input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        required
      />
      <Input
        type="date"
        value={fecha_nacimiento}
        onChange={(e) => setFechaNac(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        required
      />
    <select
        value={obra_social_id}
        onChange={(e) => setObraSocialId(e.target.value)}
        required
        style={styles.select}
      >
        <option value="">Seleccionar Obra Social</option>
        {OS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
      <div style={styles.buttonContainer}>
        <Button type="submit">Cargar Paciente</Button>
      </div>
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


export default FormularioPaciente;