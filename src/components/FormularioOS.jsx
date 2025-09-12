import React, {useState, useEffect} from 'react';
import { fetchConToken } from '../services/api';
import { colours } from '../constants/colours';
import Input from './Input';
import Button from './Button';

const FormularioOS= ({ onOSCreada, OS }) =>{
    const [nombre, setNombre] = useState(OS?.nombre || '');
    const [telefono, setTelefono] = useState(OS?.telefono || '');
    const [direccion, setDireccion] = useState(OS?.email || '');

    useEffect (() => {
        
    }, []);

    const esEdicion = Boolean(OS?.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaOS = {
            nombre,
            telefono,
            direccion
        };

        try {
          if (esEdicion){
            await fetchConToken(`obras-sociales/${OS.id}`, 'PUT', nuevaOS)
          } else {
            await fetchConToken('obras-sociales','POST', nuevaOS);
          };
            if (onOSCreada) onOSCreada();
            setNombre('');
            setTelefono('')
            setDireccion('');
        }
        catch (error) {
            console.error('Error al crear la obra social', error);
        }
    };

return (  
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Crear nueva obra social</h3>

      <Input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
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
        placeholder="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <div style={styles.buttonContainer}>
        <Button type="submit">Cargar obra social</Button>
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


export default FormularioOS;