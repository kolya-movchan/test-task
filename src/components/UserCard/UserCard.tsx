import { User } from "types/User";

type Props = {
  user: User,
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const {
    id,
    name,
    email,
    phone,
    photo,
    position,
  } = user;
  
  return (
    <div className="user-card">
      <div className="user-card__photo">
        <img
          src={photo}
          alt="user-photo"
          className="user-card__photo-img"
        />
      </div>

      <div className="user-card__name">
        {name}
      </div>
      
      <div className="user-card__description">
        {position}
      </div>

      <div className="user-card__phone-number">
        {phone}
      </div>
    </div>
  )
}
