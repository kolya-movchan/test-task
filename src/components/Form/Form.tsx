/* eslint-disable import/no-unused-modules */
import { item } from "api/api"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { RadioInput } from "components/RadioInput"
import { ChangeEvent, useEffect, useState } from "react"
import { Position } from "types/Position"
import { Position as PositionType } from "types/PositionList"
import { PositionResponse } from "types/PositionResponse"
import classnames from 'classnames'
import { emailValidation, phoneValidation } from 'utils/regex'
import { Formik } from 'formik';


export const Form = () => {
  const [positions, setPositions] = useState<Position[]>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState(PositionType.LAWYER);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    setSelectedFile(file || null);
  };

  const validateData = () => {
    const isValidEmail = emailValidation.test(email);
    const isValidPhone = phoneValidation.test(phone);

    console.log('isValidEmail', isValidEmail);
    console.log('isValidPhone', isValidPhone);

    const allowedFormats = ['image/jpeg', 'image/jpg'];

    if (selectedFile && !allowedFormats.includes(selectedFile.type)) {
      // setError('Please select a JPEG/JPG image file.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

      if (selectedFile && selectedFile.size > maxSize) {
        // setError('The file size should not exceed 5MB.');
        return;
      }

    // Create an image object to get the dimensions
    const img = new Image();
    img.src = selectedFile ? URL.createObjectURL(selectedFile) : '';
    
    img.onload = () => {
      // Check minimum dimensions
      if (img.width < 70 || img.height < 70) {
        // setError('The photo should have a minimum size of 70x70 pixels.');
        return;
      }
    }

    const acceptedData = name && isValidEmail && isValidPhone;

    if (!acceptedData) {
      return false
    }

    return true;
  }

  const handleSubmit = () => {
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

  useEffect(() => {
    loadPositions();
  }, []);

  return (
    <div className="form">
      <div className="form__content">
        <h1 className="title form__title">
          Working with POST request
        </h1>

        <div className="form__contact-details">
          <Input
            placeholder="Your name"
            value={name}
            onQuery={handleNameInput}
            minLength={2}
            maxLength={60}
            />

          <Input
            placeholder="Email"
            value={email}
            onQuery={handleEmailInput}
            minLength={2}
            maxLength={100}
          />

          <div className="form__input-phone">
            <Input
              placeholder="Phone"
              value={phone}
              onQuery={handlePhoneInput}
            />

            <span className="form__input-phone-hint">
              +38 (XXX) XXX - XX - XX
            </span>
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

        <div className="form__photo-container">
          <label htmlFor="photoUpload" className="form__file">
            Upload
          </label>

          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          <input
            className={
              classnames(
                'input input--file',
                { 'input--loaded': selectedFile }
              )
            }
            placeholder={!selectedFile ? 'Upload your photo' : selectedFile.name}
            readOnly
          />
         </div>

        <div className="form__submit">
          <Button
            text="Sign Up"
            color="grey"
            onClick={handleSubmit}
            disabled={false}
          />
        </div>
      </div>
    </div>
  )
}
