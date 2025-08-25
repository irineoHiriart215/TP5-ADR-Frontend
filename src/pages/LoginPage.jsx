import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { colours } from '../constants/colours';

const LoginPage = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/profesionales/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('profesionalId', data.profesionalId);
        navigate('/inicio');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
  <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Iniciar Sesión</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <Input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Ingresar</Button>
          </form>
          <div style={styles.register}>
            <Button variant="secondary" onClick={() => navigate('/register')}>
              ¿No estás registrado? Crear cuenta
            </Button>
          </div>
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
    padding: '20px',
  },
  card: {
    backgroundColor: colours.primary,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '24px',
    color: colours.text,
    fontSize: '24px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  register: {
    marginTop: '20px',
    textAlign: 'center',
  },
};



export default LoginPage;
