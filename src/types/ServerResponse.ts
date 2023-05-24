import { User } from "./User";

export interface ServerResponse {
  count: number,
  links: { next_url: string },
  prev_url: string | null,
  success: boolean,
  page: number,
  total_pages: number,
  total_users: number,
  users: User[]
}
