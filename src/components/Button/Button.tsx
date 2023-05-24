import React from 'react';

type Props = {
  text: string,
  color: string
} 

export const Button: React.FC<Props> = ({ text, color }) => {
  return (
  <button className={`button button--${color}`}>{text}</button>
  )
}
