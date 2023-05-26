import classNames from 'classnames';
import React, { ChangeEvent } from 'react'

type Props = {
  selectedFile: File | null,
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur: () => void,
  isError: boolean | string,
  errorText: string | boolean,
}

export const File: React.FC<Props> = ({
  selectedFile,
  onUpload,
  onBlur,
  isError,
  errorText,
}) => {
  return (
    <>
     <div className="form__photo-container">
      <label htmlFor="photoUpload" className={classNames(
          'form__file',
          { 'input-error': isError }
        )}>
        Upload
      </label>

      <input
        id="photoUpload"
        type="file"
        accept="image/*"
        onChange={onUpload}
        style={{ display: 'none' }}
        onBlur={() => onBlur()}
      />

      <input
        className={
          classNames(
            'input input--file',
            {
              'input--loaded': selectedFile,
              'input-error': isError
            }
          )
        }
        placeholder={!selectedFile ? 'Upload your photo' : selectedFile.name}
        readOnly
      />
    </div>

      <p className="helper helper--error helper--file">
        {isError ? errorText : ''}
      </p>
    </>
  )
}
