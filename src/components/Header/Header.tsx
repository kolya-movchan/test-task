import { Button } from "components/Button"

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">
        <img
          src="./icons/logo.svg"
          alt="logo"
          className="logo__picture"
        />
        </div>

        <span className="logo__text">testtask</span>
      </div>

      <div className="navigation">
        <Button text='Users' color='yellow' />
        <Button text='Sign Up' color='yellow' />
      </div>
    </header>
  )
}
