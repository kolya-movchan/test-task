import { scrollToSection } from "utils/navigation"

export const Banner = () => {
  return (
    <div className="banner">
      <h1 className="banner__title title">
        Test assignment for front-end developer
      </h1>

      <p className="banner__text">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
      </p>

      <button
          className="button" 
          onClick={() => scrollToSection('registering')}
        >
          Sign Up
        </button>
    </div>
  )
}
