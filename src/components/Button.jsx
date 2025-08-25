import React from 'react';
import { colours } from '../constants/colours';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const backgroundColor = variant === 'primary' ? colours.secondary : colours.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor,
        color: colours.text,
        border: `none`,
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
