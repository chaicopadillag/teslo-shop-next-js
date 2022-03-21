import { IUser } from '../interfaces';

type AuthStateType = {
  isLoggedIn: boolean;
  authUser: IUser | null;
};

type AuthActionType = {
  type: 'LOGIN' | 'LOGOUT';
  payload: IUser | null;
};

export const authReducer = (authState: AuthStateType, action: AuthActionType): AuthStateType => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...authState,
        isLoggedIn: true,
        authUser: action.payload,
      };
    case 'LOGOUT':
      return {
        ...authState,
        isLoggedIn: false,
        authUser: null,
      };
    default:
      return authState;
  }
};
