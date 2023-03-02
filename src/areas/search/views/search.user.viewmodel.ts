import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  id: number;
  firstName: string;
  lastName: string;
  following: boolean;
  constructor(user: IUser) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.following = false;
  }
}
