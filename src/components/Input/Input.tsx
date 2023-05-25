import React from 'react'

type Props = {
  placeholder: string,
  value: string,
  onQuery: (value: string) => void,
}

export const Input: React.FC<Props> = ({ placeholder, value, onQuery }) => {
  return (
    <input
      value={value}
      type="text"
      className="input form__text-input"
      placeholder={placeholder}
      onChange={(event) => onQuery(event.currentTarget.value)}
    />
  )
}
