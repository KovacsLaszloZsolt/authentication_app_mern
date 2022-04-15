import React, { useContext } from 'react';
import Logo from './Logo';
import UserMenu from './UserMenu';
import styles from '../styles/Header.module.scss';
import { AuthContext } from '../context/authContext';

const Header = (): JSX.Element => {
  const { loginData } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <Logo sxClass={''} />
      {loginData?.isLoggedIn && <UserMenu />}
    </header>
  );
};

export default Header;
