// import React from 'react'

import { item } from "api/api"
import { Button } from "components/Button"
import { Input } from "components/Input";
import { RadioInput } from "components/RadioInput";
import { useEffect, useState } from "react"
import { Position } from "types/Position";
import { PositionResponse } from "types/PositionResponse";

export const Form = () => {
  const [positions, setPositions] = useState<Position[]>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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
          <div className="form__upload">
            Upload
          </div>

          <input type="text" className="input form__photo-input" />
        </div>

        <Button text="Sign Up" color="grey" onClick={() => console.log(1)}/>
      </div>
    </div>
  )
}

