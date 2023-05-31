import React from 'react';
import { Position as PositionType } from '../../types/PositionList';

type Props = {
  value: string,
  checked: string,
  onSelect: (value: PositionType) => void,
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
          onChange={(event) => onSelect(event.currentTarget.value as PositionType)}
        />

        <span className="radio-title">
          {value}
        </span>
      </label>
  )
}
