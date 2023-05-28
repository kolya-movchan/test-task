import classNames from 'classnames';
import React from 'react';

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
    {!isLoading ? text : <i className="fa fa-sync fa-spin "></i>}
  </button>
  )
}
