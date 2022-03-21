import { createContext, FC, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { tesloApi } from '../services';
import { authReducer } from '../reducers';
import { IUser } from '../interfaces';
import axios from 'axios';

type AuthContextState = {
  isLoggedIn: boolean;
  authUser: IUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<{ hasError: Boolean; message: string }>;
  logout: () => void;
};
const AuthInitialState: AuthContextState = {
  isLoggedIn: false,
  authUser: null,
  login: async () => false,
  register: async () => ({ hasError: false, message: '' }),
  logout: () => {},
};

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const { data } = await tesloApi.get('/user/verify-token');
        const { token, user } = data;
        dispatch({ type: 'LOGIN', payload: user });
        Cookies.set('token', token, { expires: 1, path: '/', sameSite: 'strict' });
      } catch (error) {
        console.log('error verify token');
        Cookies.remove('token');
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });

      const { token, user } = data;

      Cookies.set('token', token, { expires: 1, path: '/', sameSite: 'strict' });

      dispatch({ type: 'LOGIN', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ hasError: Boolean; message: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });

      const { token, user } = data;

      Cookies.set('token', token, { expires: 1, path: '/', sameSite: 'strict' });

      dispatch({ type: 'LOGIN', payload: user });

      return {
        hasError: false,
        message: 'Registro exitoso',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message || 'Error al registrar usuario',
        };
      }

      return {
        hasError: true,
        message: 'Error interno de la aplicación',
      };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
