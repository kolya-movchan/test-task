import React from 'react';

type Props = {
  text: string,
  color: string,
  onClick: () => void,
  disabled?: boolean,
} 

export const Button: React.FC<Props> = ({ text, color, onClick, disabled = false }) => {
  return (
  <button
    className={`button button--${color}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
  )
}
