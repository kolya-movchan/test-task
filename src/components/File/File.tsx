import React from 'react'
import classNames from 'classnames';

type Props = {
  selectedFile: File | null,
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
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
      <label
        htmlFor="photoUpload"
        className={classNames(
          'form__file',
          { 'input-error': isError }
        )}
      >
        Upload
      </label>

      {/* hiding default input adding styled one with controling of visual effects with a help of classes */}

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

      {/* reserving space for error and showing error thext if error occurs */}

      <p className="helper helper--error helper--file">
        {isError ? errorText : ''}
      </p>
    </>
  )
}
