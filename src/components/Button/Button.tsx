import React from 'react';

type Props = {
  text: string,
  color: string,
  onClick: () => void,
} 

export const Button: React.FC<Props> = ({ text, color, onClick }) => {
  return (
  <button
    className={`button button--${color}`}
    onClick={onClick}
  >
    {text}
  </button>
  )
}
