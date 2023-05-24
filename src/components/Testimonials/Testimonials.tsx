import { item } from "api/api";
import { UserCard } from "components/UserCard";
import { useEffect, useState } from "react";
import { ServerResponse } from "types/ServerResponse";
import { User } from "types/User";

export const Testimonials = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadSpecialists = async() => {
    const response = await item.get<ServerResponse>('/users?page=1&count=6');

    try {
      const { users, page, total_pages } = response;

      setUsers(users);
      setPage(page);
      setTotalPages(total_pages);
    } catch {
      console.log('error');
    }

  };

  useEffect(() => {
    loadSpecialists();
  }, []);

  return (
    <div className="testimonials">
      <h1 className="title testimonials__title">
        Working with GET request
      </h1>

      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  )
}
