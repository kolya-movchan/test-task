import React from 'react';

type Props = {
  value: string,
  checked: string,
  onSelect: (value: string) => void,
}

export const RadioInput: React.FC<Props> = ({ value, checked, onSelect }) => {
  return (
      <label className="form__radio">
        <input
          type="radio"
          name={value}
          value={value}
          className="form__radio-input radio"
          checked={checked === value}
          onChange={(event) => onSelect(event.currentTarget.value)}
        />
        <span className="radio-title">
          {value}
        </span>
      </label>
  )
}
