import { scrollToSection } from "utils/navigation"

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

        <button
          className="button" 
          onClick={() => scrollToSection('users')}
        >
          Users
        </button>

        <button
          className="button" 
          onClick={() => scrollToSection('registering')}
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}
