export interface User {
  id: string,
  name: string,
  email: string,
  phone: string,
  photo: string,
  position: string,
  position_id: number
  registration_timestamp: number,
}

export interface UserForPost {
  name: string,
  email: string,
  phone: string,
  position_id: number | null,
  photo: File | null,
  // id: number,
}
