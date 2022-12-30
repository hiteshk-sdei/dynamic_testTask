interface IUsersDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  randomString?: string;
  age?: number | string;
  gender?: string;
  testimonial?: string;
}

interface IUserInitialState {
  getUser?: string[];
  editUser?: string[];
  isGetUserLoading?: boolean;
  isEditDetailsLoading?: boolean;
  getUserError?: string;
  editUserError?: string;
}

interface IGetUserProps {
  fieldName?: any;
  type?: string;
  value?: string;
  options?: string[];
}

export { IUsersDetails, IUserInitialState, IGetUserProps };
