// import React from 'react'

import { Button } from "components/Button"

export const Form = () => {
  return (
    <div className="form">
      <div className="form__content">
        <h1 className="title form__title">
          Working with POST request
        </h1>

        <input type="text" className="input form__text-input" />
        <input type="text" className="input form__text-input" />
        <input type="text" className="input form__text-input" />

        <div className="position form__position">
          <h2 className="form__position-title">
            Select your position
          </h2>

          <label className="form__checkbox">
            <input
              type="checkbox"
              name=""
              className="form__checkbox-input"
            />
            Frontend developer
          </label>

          <label className="form__checkbox">
            <input
              type="checkbox"
              name=""
              className="form__checkbox-input"
            />
            Backend developer
          </label>

          <label className="form__checkbox">
            <input
              type="checkbox"
              name=""
              className="form__checkbox-input"
            />
            Designer
          </label>

          <label className="form__checkbox">
            <input
              type="checkbox"
              name=""
              className="form__checkbox-input"
            />
            QA
          </label>
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

