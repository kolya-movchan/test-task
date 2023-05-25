// import React from "react";
import ReactLoading from 'react-loading';
import '../../styles/_variables.scss';

import { item } from "api/api";
import { Button } from "components/Button";
import { UserCard } from "components/UserCard";
import { useEffect, useState } from "react";
import { UsersResponse } from "types/UsersResponse";
import { User } from "types/User";

export const Testimonials = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const reachedLimit = page === totalPages;

  const loadSpecialists = async() => {
    if (reachedLimit) {
      return;
    }

    try {
      setIsLoading(true);

      const response: UsersResponse = await item.get<UsersResponse>(`/users?page=${page + 1}&count=6`);

      const { users: usersFromServer, page: currentPage, total_pages } = response;

      const sortedUsers = usersFromServer.sort((user1, user2) => (
        user1.registration_timestamp - user2.registration_timestamp)
      );

      setUsers([...users, ...sortedUsers]);
      setPage(currentPage);
      setTotalPages(total_pages);
    } catch {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    loadSpecialists();
  }

  useEffect(() => {
    loadSpecialists();
  }, []);

  return (
    <div className="testimonials">
      <h1 className="title testimonials__title">
        Working with GET request
      </h1>

      {/* <div className="testimonials__users">
        {users.map(user => <UserCard key={user.id} user={user} />)}

        {isLoading && (
        <ReactLoading type="spin" color='#00bdd3' height={40} width={40} />
        )}


        {!reachedLimit && (
          <Button
          text="Show more"
          color="yellow"
          onClick={handleClick}
          />
        )}
      </div> */}
    </div>
  )
}
