import { scrollToSection } from "utils/navigation"

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="logo-container">
          <a href="/" className="logo-wrapper">
            <div className="logo">
              <img
                src="./icons/logo.svg"
                alt="logo"
                className="logo__picture"
              />
            </div>
            <span className="logo__text">testtask</span>
          </a>

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
      </div>
    </header>
  )
}
