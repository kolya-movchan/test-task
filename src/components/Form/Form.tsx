/* eslint-disable import/no-unused-modules */
import React from 'react'

import { item } from "api/api"
import { Button } from "components/Button"
import { Input } from "components/Input"
import { RadioInput } from "components/RadioInput"
import { ChangeEvent, useEffect, useState } from "react"
import { Position } from "types/Position"
import { PositionResponse } from "types/PositionResponse"
import classnames from 'classnames'

export const Form = () => {
  const [positions, setPositions] = useState<Position[]>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
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

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setSelectedFile(file || null);
  };

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
          />

          <Input
            placeholder="Email"
            value={email}
            onQuery={handleEmailInput}
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
            onClick={() => console.log(1)}
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}
