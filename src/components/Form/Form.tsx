// import React from 'react'

import { item } from "api/api"
import { Button } from "components/Button"
import { useEffect, useState } from "react"
import { Position } from "types/Position";
import { PositionResponse } from "types/PositionResponse";

export const Form = () => {
  const [positions, setPositions] = useState<Position[]>();

  const loadPositions = async () => {
    try {
      const response = await item.get<PositionResponse>('/positions');

      console.log(response.positions);

      setPositions(response.positions)
      
    } catch (error) {
      console.log(error);
    }
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
          <input
            type="text"
            className="input form__text-input"
            placeholder="Your name"
          />

          <input
            type="text"
            className="input form__text-input"
            placeholder="Email"
            />

          <div className="form__input-phone">
            <input
              type="text"
              className="input form__text-input"
              placeholder="Phone"
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

          <div className="positions">
            {positions && (
              positions.map(position => {
                const { id, name } = position;

                return (
                  <label className="form__checkbox" key={id}>
                    <input
                      type="checkbox"
                      name={name}
                      className="form__checkbox-input"
                    />
                      {name}
                  </label>
                )
              })
            )}
          </div>
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

