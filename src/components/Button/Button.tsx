import React from 'react';
import classNames from 'classnames';

type Props = {
  text: string,
  onClick?: () => void,
  disabled?: boolean,
  type?: string,
  isLoading?: boolean,
} 

export const Button: React.FC<Props> = ({
  text,
  onClick,
  disabled = false,
  type = 'button',
  isLoading
}) => {
  return (
  // control visual effects with classes that depend on props
  <button
    className={classNames(
      `button`,
      {
        'text-white': isLoading,
        'button--showMore': type === 'button'
      }
    )}
    onClick={onClick}
    type={type === 'submit' ? "submit" : "button"}
    disabled={disabled}
  >
    {!isLoading ? text : <i className="fa fa-sync fa-spin"></i>}
  </button>
  )
}
