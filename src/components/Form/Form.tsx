/* eslint-disable import/no-unused-modules */
import { item } from "api/api"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { File as FileInput } from "components/File"
import { RadioInput } from "components/RadioInput"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Position } from "types/Position"
import { Position as PositionType } from "types/PositionList"
import { PositionResponse } from "types/PositionResponse"
import { emailValidation, phoneValidation } from 'utils/regex'
import { Error, ErrorObject } from '../../types/Error';
import { Helper } from "types/Helper"


export const Form = () => {
  const [positions, setPositions] = useState<Position[]>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState(PositionType.LAWYER);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const initial: ErrorObject = {
    errorName: false,
    errorTextName: '',
    errorEmail: false,
    errorTextEmail: '',
    errorPhone: false,
    errorTextPhone: '',
    errorFile: false,
    errorTextFile: ''
  }

  const [error, setError] = useState(initial);

  const loadPositions = async () => {
    try {
      const response = await item.get<PositionResponse>('/positions');

      setPositions(response.positions)
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleNameInput = (value: string) => {
    setName(value)
  }

  const handleEmailInput = (value: string) => {
    setEmail(value)
  }

  const handlePhoneInput = (value: string) => {
    setPhone(value)
  }

  const handleOptionChange = (value: PositionType) => {
    setSelectedOption(value);

    switch (value) {
      case PositionType.LAWYER:
        setSelectedOptionId(1);

        break;

      case PositionType.CONTENTMANAGER:
        setSelectedOptionId(2);

        break;

      case PositionType.SECURITY:
        setSelectedOptionId(3);

        break;

      case PositionType.DESIGNER:
        setSelectedOptionId(4);
      
        break;


      default: setSelectedOptionId(null);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file || null);
    }
  };

  const validateData = () => {
    const acceptedData = name;

    if (!acceptedData) {
      return false
    }

    return true;
  }

  const validateInputName = () => {
    if (!name.length) {
      setError({
        ...error,
        errorName: true,
        errorTextName: Error.NONAME,
      });

      return
    }

    if (name.length < 2) {
      setError({
        ...error,
        errorName: true,
        errorTextName: Error.SHORTNAME,
      });

      return
    }

    if (name.length === 60) {
      setError({
        ...error,
        errorName: true,
        errorTextName: Error.LONGNAME,
      });

      return
    }

    setError({
      ...error,
      errorName: false,
      errorTextName: '',
    });
  }

  const validateInputEmail = () => {
    const isValidEmail = emailValidation.test(email);

    if (!email) {
      setError({
        ...error,
        errorEmail: true,
        errorTextEmail: Error.NOEMAIL,
      });

      return
    }

    if (!isValidEmail) {
      setError({
        ...error,
        errorEmail: true,
        errorTextEmail: Error.WRONGEMAIL,
      });

      return
    }

    setError({
      ...error,
      errorEmail: false,
      errorTextEmail: '',
    });
  }

  const validateInputPhone = () => {
    const isValidPhone = phoneValidation.test(phone);

    if (!phone) {
      setError({
        ...error,
        errorPhone: true,
        errorTextPhone: Error.NOPHONE,
      });

      return
    }

    if (!isValidPhone) {
      setError({
        ...error,
        errorPhone: true,
        errorTextPhone: Error.WRONGPHONEFORMAT,
      });

      return
    }

    setError({
      ...error,
      errorPhone: false,
      errorTextPhone: '',
    });
  }

  const validateInputFile = () => {
    if (!selectedFile) {
      return
    }

    const allowedFormats = ['image/jpeg', 'image/jpg'];

    if (!allowedFormats.includes(selectedFile.type)) {
      setError({
        ...error,
        errorFile: true,
        errorTextFile: Error.FILEFORMAT,
      });

      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

      if (selectedFile.size > maxSize) {
        setError({
          ...error,
          errorFile: true,
          errorTextFile: Error.FILESIZE,
        });

        return;
      }

    // Create an image object to get the dimensions
    const img = new Image();
    img.src = selectedFile ? URL.createObjectURL(selectedFile) : '';
    
    img.onload = () => {
      // Check minimum dimensions
      if (img.width < 70 || img.height < 70) {
        setError({
          ...error,
          errorFile: true,
          errorTextFile: Error.FILERESOLUTION,
        });

        return;
      }
    }

    setError({
      ...error,
      errorFile: false,
      errorTextFile: '',
    });
  }

  const enableSubmit = () => {
    const allFilledIn = name && email && phone && selectedOption && selectedFile;

    if (!allFilledIn) {
      return false
    }

    for (const key in error) {
      if (typeof error[key] === "boolean" && error[key] === true) {
        return false
      }
    }

    return true;
  }

  console.log(enableSubmit());
  

  const handleSubmit = (event: React.FormEvent) => {
    console.log(1);
    
    event.preventDefault();

    if (!validateData()) {
      return
    }
    
    const newUser = {
      name,
      email,
      phone,
      position_id: selectedOptionId,
      photo: selectedFile,
    }

    console.log('newUser', newUser);
  }

  const {
    errorName,
    errorEmail,
    errorPhone,
    errorTextName,
    errorTextEmail,
    errorTextPhone,
    errorFile,
    errorTextFile,
  } = error;

  useEffect(() => {
    loadPositions();
  }, []);

  useEffect(() => {
    validateInputFile()
  }, [selectedFile])

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__content">
        <h1 className="title form__title">
          Working with POST request
        </h1>

        <div className="form__contact-details">
          <Input
            placeholder="Your name"
            value={name}
            maxLength={60}
            onQuery={handleNameInput}
            onBlur={validateInputName}
            isError={errorName}
            errorText={errorTextName}
            helperText={Helper.NAME}
            />

          <Input
            placeholder="Email"
            value={email}
            minLength={2}
            maxLength={100}
            onQuery={handleEmailInput}
            onBlur={validateInputEmail}
            isError={errorEmail}
            errorText={errorTextEmail}
            helperText={Helper.EMAIL}
          />

          <div className="form__input-phone">
            <Input
              placeholder="Phone"
              value={phone}
              onQuery={handlePhoneInput}
              onBlur={validateInputPhone}
              isError={errorPhone}
              errorText={errorTextPhone}
              helperText={Helper.PHONE}
            />
          </div>
        </div>

        <div className="position form__position">
          <h2 className="form__position-title">
            Select your position
          </h2>

          <ul className="positions">
            {positions && (
              positions.map(position => {
                const { id, name } = position;

                return (
                  <li className="form__radio" key={id}>
                    <RadioInput
                      value={name}
                      checked={selectedOption}
                      onSelect={handleOptionChange}
                    />
                  </li>
                )
              })
            )}
          </ul>
        </div>

        <FileInput
          selectedFile={selectedFile}
          onUpload={handleFileUpload}
          onBlur={validateInputFile}
          isError={errorFile}
          errorText={errorTextFile}
        />

        <div className="form__submit">
          <Button
            text="Sign Up"
            color="grey"
            type="submit"
            disabled={!enableSubmit()}
          />
        </div>
      </div>
    </form>
  )
}
