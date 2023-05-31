import React, { ChangeEvent, useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "utils/store"
import { actions as errorActions, State } from "reducers/error"
import { actions as userActions } from "reducers/newUserId"

import { emailValidation, phoneValidation } from 'utils/regex'

import { item } from "api/api"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { File as FileInput } from "components/File"
import { RadioInput } from "components/RadioInput"

import { Position } from "types/Position"
import { Position as PositionType } from "types/PositionList"
import { PositionResponse } from "types/PositionResponse"
import { Error } from '../../types/Error';
import { Helper } from "types/Helper"
import { Token } from "types/TokenResponse"
import { UserPostResponse } from "types/UserPostResponse"

export const Form = () => {
  const dispatch = useDispatch();

  const newUserId = useSelector<RootState, number>((state) => state.newUserId);

  const {
    errorName,
    errorTextName,
    errorEmail,
    errorTextEmail,
    errorPhone,
    errorTextPhone,
    errorFile,
    errorTextFile,
  } = useSelector<RootState, State>((state) => state.newError);
  
  const [positions, setPositions] = useState<Position[]>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState(PositionType.LAWYER);
  const [selectedOptionId, setSelectedOptionId] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPositions = async () => {
    try {
      const response = await item.get<PositionResponse>('/positions');

      setPositions(response.positions)
    } catch (error) {
      // error logic
    }
  }

  const loadToken = async () => {
    try {
      const token = await item.get<Token>('/token');

      localStorage.setItem('tokenKey', token.token);
    } catch (error) {
      // error logic
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

    // controlling the state of position with a help of the targeted element from the options list

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


      default: setSelectedOptionId(1);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file || null);
    }
  };

  // 4 validate functions below take care of the error state of each input field with the help of Redux dispatch hook, and show the error depending on the boolean value and the enum text arguments.

  const validateInputName = () => {
    // if no name is entered show the error
    if (!name.length) {
      dispatch(errorActions.notifyWrongName(true, Error.NONAME));
      return
    }

    // if name length entered less than 2 charactes show the error
    if (name.length < 2) {
      dispatch(errorActions.notifyWrongName(true, Error.SHORTNAME));
      return
    }

    // if name length entered more than 60 charactes show the error
    if (name.length === 61) {
      dispatch(errorActions.notifyWrongName(true, Error.LONGNAME));
      return
    }

    dispatch(errorActions.notifyWrongName(false));
  }

  const validateInputEmail = () => {
    const isValidEmail = emailValidation.test(email);

    // if no email is entered show the error
    if (!email) {
      dispatch(errorActions.notifyWrongEmail(true, Error.NOEMAIL));
      return
    }

    // if email entered does not satisfy the format of the requirement show the error
    if (!isValidEmail) {
      dispatch(errorActions.notifyWrongEmail(true, Error.WRONGEMAIL))
      return
    }

    dispatch(errorActions.notifyWrongEmail(false))
  }

  const validateInputPhone = () => {
    const isValidPhone = phoneValidation.test(phone);

    // if no phone is entered show the error
    if (!phone) {
      dispatch(errorActions.notifyWrongPhone(true, Error.NOPHONE));
      return
    }

    // if phone entered does not satisfy the format of the requirement show the error
    if (!isValidPhone) {
      dispatch(errorActions.notifyWrongPhone(true, Error.WRONGPHONEFORMAT));
      return
    }

    dispatch(errorActions.notifyWrongPhone(false));
  }

  const validateInputFile = () => {
    // if no file is selected we just return from the function
    if (!selectedFile) {
      return
    }

    const allowedFormats = ['image/jpeg', 'image/jpg'];

    // if format differs from allowedFormats show the error
    if (!allowedFormats.includes(selectedFile.type)) {
      dispatch(errorActions.notifyWrongFile(true, Error.FILEFORMAT));
      return;
    }

    const maxSize = 5e+6; // 5MB

    // if size more than maxSize show the error
    if (selectedFile.size > maxSize) {
      dispatch(errorActions.notifyWrongFile(true, Error.FILESIZE));
      return;
    }

    // Create an image object to get the dimensions
    const img = new Image();
    img.src = selectedFile ? URL.createObjectURL(selectedFile) : '';
    
    img.onload = () => {
      // Check minimum dimensions and if it less than 70x70 show the error
      if (img.width < 70 || img.height < 70) {
        dispatch(errorActions.notifyWrongFile(true, Error.FILERESOLUTION));
        return;
      }
    }

    dispatch(errorActions.notifyWrongFile(false));
  }

  // we need this function to control the submit button
  const enableSubmit = () => {
    const allFilledIn = name && email && phone && selectedOption && selectedFile;

    // if some field is not filled in we just return immediately
    if (!allFilledIn) {
      return false
    }

    // if some field has an error we still forbid to enable the submit button
    const errorsStateObject = {
      errorName,
      errorEmail,
      errorPhone,
      errorFile,
    }

    for (const key in errorsStateObject) {
      if (errorsStateObject[key as keyof typeof errorsStateObject] === true) {
        return false
      }
    }

    return true;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // setting up data as is stated in tech requirements
    const formData = new FormData();

    formData.append('position_id', selectedOptionId.toString());
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', selectedFile as File);

    try {
      setIsLoading(true)
      const response = await item.post<UserPostResponse>('/users', formData);

      dispatch(userActions.add(response.user_id))
      
    } catch (error) {
      // error logic
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPositions();
    loadToken();
  }, []);

  useEffect(() => {
    validateInputFile()
  }, [selectedFile])

  // if the user is registered we immediately show the success picture and do not render the rest
  if (newUserId) {
    return (
      <div className="success">
        <h1 className="title success__title">
          User successfully registered
        </h1>

        <img
          src="./success.svg"
          alt="success"
          className="success__photo"
        />
      </div>
    )
  }

  return (
    <form
      className="form"
      id="registering"
      onSubmit={handleSubmit}
    >

      <h1 className="title form__title">
        Working with POST request
      </h1>

      <div className="form__container">
        <div className="form__container">
          <div className="form__contact-details">
            <Input
              placeholder="Your name"
              value={name}
              maxLength={61}
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

          {positions && (
             <div className="position form__position">
              <h2 className="form__position-title">
                Select your position
              </h2>
  
              <ul className="positions">
                {positions.map(position => {
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
                  })}
              </ul>
           </div>
          )}

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
              type="submit"
              disabled={!enableSubmit()}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
