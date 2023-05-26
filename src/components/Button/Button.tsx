import React from 'react';

type Props = {
  text: string,
  color: string,
  onClick?: () => void,
  disabled?: boolean,
  type?: string,
} 

export const Button: React.FC<Props> = ({
  text,
  color,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  return (
  <button
    className={`button button--${color}`}
    // onClick={(event) => {
    //   event.preventDefault();
    //   onClick();
    // }}
    type={type === 'submit' ? "submit" : "button"}
    disabled={disabled}
  >
    {text}
  </button>
  )
}
