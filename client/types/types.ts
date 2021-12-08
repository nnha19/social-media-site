export interface IUser {
  username: string;
  _id?: string;
  email: string;
  profilePicture?: string;
  token?: string;
}

export interface IUsers {
  users: IUser[];
}
