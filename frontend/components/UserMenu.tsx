import React, { useContext, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import styles from '../styles/UserMenu.module.scss';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authContext';

const UserMenu = (): JSX.Element => {
  const router = useRouter();
  const { loginData, setLoginData, setUserDetails } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleUserMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('modalOpen');
  };

  const handleModalClick = (): void => {
    setIsMenuOpen(false);
    document.body.classList.remove('modalOpen');
  };

  const handleMyProfileClick = (): void => {
    setIsMenuOpen(false);
    void router.push(`/${loginData.id}`);
  };

  const handleLogoutClick = (): void => {
    setIsMenuOpen(false);
    setLoginData(null);
    setUserDetails(null);
    localStorage.removeItem('loginData');
    void router.push('/login');
  };

  return (
    <>
      <div className={styles.userMenuCtn}>
        <div className={styles.userMenuHead} onClick={handleUserMenu}>
          {loginData.photoUrl ? (
            <img className={styles.img} src={loginData.photoUrl} alt="profile picture" />
          ) : (
            <AccountCircleIcon />
          )}
          {loginData.name && <span className={styles.name}>{loginData.name}</span>}
          {isMenuOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.modal} onClick={handleModalClick}>
          <ul className={styles.userMenu}>
            <li className={styles.userMenuItem} onClick={handleMyProfileClick}>
              <AccountCircleIcon className={styles.userMenuItemIcon} />
              <span>My Profile</span>
            </li>
            <li className={styles.userMenuItem}>
              <GroupIcon className={styles.userMenuItemIcon} />
              <span>Group Chat</span>
            </li>
            <div className={styles.divider}></div>
            <li className={styles.userMenuItem} onClick={handleLogoutClick}>
              <ExitToAppIcon className={styles.userMenuItemIcon} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserMenu;
