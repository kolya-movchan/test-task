import { useEffect, useState } from "react";

import { useSelector } from "react-redux"
import { RootState } from 'utils/store';
import ReactLoading from 'react-loading';

import { item } from "api/api";
import { Button } from "components/Button";
import { UserCard } from "components/UserCard";

import { UsersResponse } from "types/UsersResponse";
import { User } from "types/User";

export const Testimonials = () => {
  const newUserId = useSelector<RootState, number>((state) => state.newUserId)

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const reachedLimit = page === totalPages;
 
  const loadSpecialists = async (nextPage = 1) => {
    // prevent loading users if it is the last page
    if (reachedLimit) {
      return;
    }

    try {
      setIsLoading(true);

      // If the next page is not passed (meaning we called loadSpecialists from useEffect) and it equals 1. Then we load the first page from API where new user us located.
      const response: UsersResponse = await item.get<UsersResponse>(`/users?page=${nextPage}&count=6`);

      const { users: usersFromServer, page: currentPage, total_pages } = response;

      const sortedUsers = usersFromServer.sort((user1, user2) => (
        user2.registration_timestamp - user1.registration_timestamp)
      );

      // We have just added a new user so have to just display the first page from API. Otherwise it means that we called the function in handleClick and passed nextPage, so we need to add up users to the existing ones.
      if (nextPage === 1 && newUserId > 0) {
        setUsers(sortedUsers);
      } else {
        setUsers([...users, ...sortedUsers]);
      }

      setPage(currentPage);
      setTotalPages(total_pages);
    } catch (error) {
      // error logic
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    const nextPage = page + 1;

    loadSpecialists(nextPage);
  }

  useEffect(() => {
    loadSpecialists();
  }, [newUserId]);

  return (
    <div className="testimonials" id='users'>
        <h1 className="title testimonials__title">
          Working with GET request
        </h1>

        <div className="testimonials__users">
          {users.map(user => <UserCard key={user.id} user={user} />)}
        </div>

        {isLoading && (
          <ReactLoading
            type="spin"
            color='#00bdd3'
            height={40}
            width={40}
            className='loading'
          />
        )}

        {!reachedLimit && (
          <Button
            text="Show more"
            onClick={handleClick}
            type="button"
          />
        )}
    </div>
  )
}
