
import React from 'react';
import { colours } from '../constants/colours';

const Input = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: '10px',
        borderRadius: '6px',
        border: `1px solid ${colours.text}`,
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '16px',
        color: colours.text,
        background: 'transparent',
      }}
    />
  );
};

export default Input;
