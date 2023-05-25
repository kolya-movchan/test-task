import React, { SyntheticEvent } from "react";
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

        <div className="user-card__email">
          {email}
        </div>

        <div className="user-card__phone-number">
          {phone}
        </div>
      </div>
    </div>
  )
}
