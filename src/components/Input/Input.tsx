import React, { useState } from 'react'
import classNames from 'classnames'

type Props = {
  placeholder: string,
  value: string,
  minLength?: number,
  maxLength?: number,
  onQuery: (value: string) => void,
  onBlur: () => void,
  isError: boolean | string,
  errorText: string | boolean,
  helperText: string,
}

export const Input: React.FC<Props> = ({
  placeholder,
  value,
  maxLength,
  onQuery,
  onBlur,
  isError,
  errorText,
  helperText,
}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
      <div className="form__input-container">
        <div className="form__input-wrapper">
          <input
            value={value}
            type="text"
            className={classNames(
              'input form__text-input',
              { 'input-error': isError }
            )}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(event) => onQuery(event.currentTarget.value)}
            onBlur={() => {
              onBlur();
              setIsFocused(false)
            }}
            onFocus={() => setIsFocused(true)}
            style={{ outline: 'none'}}
            required
          />

          {/* here we display either helper text or error text depending if we receive true or false as error's value from props */}
          {!isError ?
          (
            <p className="helper helper--info">
              {isFocused && helperText}
           </p>
          ) : (
            <>
             <div className="legend-title">{placeholder}</div>

            <p className="helper helper--error">
              {errorText}
            </p>
            </>
          )}
        </div>
      </div>
  )
}
