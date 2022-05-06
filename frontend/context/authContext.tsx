import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { ElementProps } from '../interfaces';

type AuthContextType = {
  loginData: LoginData;
  setLoginData: Dispatch<SetStateAction<LoginData>>;
  userDetails: UserDetails;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
};

export type LoginData = {
  token: string;
  id: string;
  name?: string;
  photoUrl?: string;
  isLoggedIn: boolean;
};

export type UserDetails = {
  photoUrl: string;
  name: string;
  bio: string;
  phoneNum: number;
  email: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: ElementProps): JSX.Element => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  return (
    <AuthContext.Provider value={{ loginData, setLoginData, userDetails, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
