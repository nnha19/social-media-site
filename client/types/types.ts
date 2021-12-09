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

export interface INotifications {
  _id: string;
  notiOwner: string;
  notifications: {
    user: IUser;
    action: string;
    type?: string;
    date: string;
  }[];
}
