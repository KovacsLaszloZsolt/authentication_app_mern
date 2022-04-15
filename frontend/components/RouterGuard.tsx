import { useRouter } from 'next/router';
import React, { FunctionComponent, useContext, useEffect } from 'react';
import { AuthContext, LoginData } from '../context/authContext';

type Child = {
  children: React.ReactNode;
};

const RouterGuard: FunctionComponent<Child> = ({ children }) => {
  const router = useRouter();
  const { setLoginData } = useContext(AuthContext);

  useEffect(() => {
    const localLoginData = localStorage.getItem('loginData');
    const path = router.asPath;
    if (localLoginData) {
      const localLoginDataObj = JSON.parse(localLoginData) as LoginData;
      setLoginData({ ...localLoginDataObj, isLoggedIn: true });

      if (path === '/login' || path === '/register' || path === '/') {
        void router.push(`/${localLoginDataObj.id}`);
      }

      return;
    }

    if (path === '/login' || path === '/register') {
      void router.push(`${path}`);
      return;
    }

    return;
  }, []);
  return <>{children}</>;
};

export default RouterGuard;
