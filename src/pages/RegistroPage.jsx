import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSinToken } from '../services/api';
import { colours } from '../constants/colours';
import Button from '../components/Button';
import Input from '../components/Input';

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [matricula, setMatricula] = useState('');
    const [titulo, setTitulo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoProfesional = {
            nombre,
            email,
            dni,
            matricula,
            titulo,
            contraseña,
        }

        try {
            await fetchSinToken('profesionales', 'POST', nuevoProfesional);
            navigate('/');
        }
        catch (error) {
            console.error('Error al registrar profesional:', error.message);
        }
    }

    return(
    
<div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registro de Profesional</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <div style={styles.buttonContainer}>
            <Button type="submit">Registrarse</Button>
          </div>
        </form>
      </div>
    </div>
    );
};

const styles = {
  container: {
    backgroundColor: colours.background,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
  },
  card: {
    backgroundColor: colours.primary,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    marginBottom: '24px',
    color: colours.background,
    fontSize: '24px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default RegisterPage;