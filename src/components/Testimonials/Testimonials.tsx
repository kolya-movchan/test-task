// import React from "react";
import ReactLoading from 'react-loading';
import '../../styles/_variables.scss';

import { item } from "api/api";
import { Button } from "components/Button";
import { UserCard } from "components/UserCard";
import { useEffect, useState } from "react";
import { UsersResponse } from "types/UsersResponse";
import { User } from "types/User";
import { RootState } from 'utils/store';
import { actions } from 'reducers/newUserId';
import { useDispatch, useSelector } from "react-redux"

export const Testimonials = () => {
  const dispatch = useDispatch();

  const newUserId = useSelector<RootState, number>((state) => state.newUserId)

  console.log('newUserId', newUserId);
  

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const reachedLimit = page === totalPages;
 
  const loadSpecialists = async (nextPage = 1) => {
    if (reachedLimit) {
      return;
    }

    try {
      setIsLoading(true);

      const response: UsersResponse = await item.get<UsersResponse>(`/users?page=${nextPage}&count=6`);

      const { users: usersFromServer, page: currentPage, total_pages } = response;

      const sortedUsers = usersFromServer.sort((user1, user2) => (
        user2.registration_timestamp - user1.registration_timestamp)
      );
      
      console.log(nextPage, 'nextPAGE');
      console.log(newUserId, 'newUserId');
      console.log(newUserId > 0, nextPage === 1);
      // console.log('DISPATCH');
      // console.log(dispatch(actions.remove()));
      // console.log('DISPATCH');
      
      
      if (nextPage === 1 && newUserId > 0) {
        setUsers(sortedUsers);
        dispatch(actions.remove())
        console.log('dispatch');
      } else {
        setUsers([...users, ...sortedUsers]);
      }

      setPage(currentPage);
      setTotalPages(total_pages);
    } catch {
      console.log('errorHERE');
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
    <div className="testimonials">
      <h1 className="title testimonials__title">
        Working with GET request
      </h1>

      <div className="testimonials__users">
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
      </div>
    </div>
  )
}
