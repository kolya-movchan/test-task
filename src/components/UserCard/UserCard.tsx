import React, { SyntheticEvent, useState } from "react";
import { User } from "types/User";

type Props = {
  user: User,
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const {
    name,
    email,
    phone,
    photo,
    position,
  } = user;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const defaultSrc = './user.png';
    const target = event.target as HTMLImageElement;

    target.src = defaultSrc;
  };
  
  return (
    <div className="user-card">
      <div className="user-card__photo">
        <img
          src={photo}
          onError={handleImageError}
          alt="user"
          className="user-card__photo-img"
        />
      </div>

      <div className="user-card__name">
        {name}
      </div>
      
      <div className="user-card__description">
        <div className="user-card__position">
          {position}
        </div>

        <div
          className="user-card__email"
          onMouseOver={() => setShowTooltip(true)}
          onMouseOut={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          <a href={`mailto:${email}`}>
            {email}
          </a>

          {showTooltip && (
            <div className="tooltip">{email}</div>
          )}
        </div>

        <div className="user-card__phone-number">
          <a href={`tel:${phone}`}>
            {phone}
          </a>
        </div>
      </div>
    </div>
  )
}
