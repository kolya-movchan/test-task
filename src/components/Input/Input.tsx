import React from 'react'

type Props = {
  placeholder: string,
  value: string,
  onQuery: (value: string) => void,
  minLength?: number,
  maxLength?: number,
}

export const Input: React.FC<Props> = ({
  placeholder,
  value,
  onQuery,
  minLength,
  maxLength,
}) => {
  return (
    <input
      value={value}
      type="text"
      className="input form__text-input"
      placeholder={placeholder}
      onChange={(event) => onQuery(event.currentTarget.value)}
      min={minLength}
      max={maxLength}
      required
    />
  )
}
