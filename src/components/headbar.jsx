import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaCog} from 'react-icons/fa'
import { colours } from '../constants/colours';

const Headbar = () => {
    const navigate = useNavigate();

    return (
    <div style={styles.container}>
      <div style={styles.left}>
        <button style={styles.iconButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>
      <div style={styles.center}>
        <span style={styles.logoText}>Equa</span>
      </div>
      <div style={styles.right}>
        <button style={styles.iconButton} onClick={() => navigate('/inicio')}>
          <FaHome />
        </button>
        <button style={styles.iconButton} onClick={() => navigate('/configuracion')}>
          <FaCog />
        </button>
      </div>
    </div>
    );
};

const styles = {
  container: {
    backgroundColor: colours.primary,
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    borderBottom: `1px solid ${colours.accent}`,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: colours.background,
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  logoText: {
    color: colours.background,
    fontSize: '18px',
    fontWeight: 'bold',
  },
};




export default Headbar;