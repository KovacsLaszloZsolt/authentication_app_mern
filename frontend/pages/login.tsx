import React, { useState, useContext } from 'react';
import LoginReg from '../components/LoginReg';
import Socials from '../components/Socials';
import styles from '../styles/Login.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext, LoginData } from '../context/authContext';
import { NextPage } from 'next';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export type UserInfo = {
  email: string;
  password: string;
};

export type Errors = UserInfo & { response: string };

axios.defaults.baseURL = 'http://localhost:3001';

const login: NextPage = (): JSX.Element => {
  const { setLoginData } = useContext(AuthContext);
  const [loginValues, setLoginValues] = useState<UserInfo>({ email: '', password: '' });
  const [formSubmited, setFormSubmited] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({ email: '', password: '', response: '' });
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    setErrors({ ...errors, response: '' });
    e.preventDefault();
    setFormSubmited(true);

    if (!errors.email && !errors.password) {
      try {
        const response = await axios.post('/login', {
          email: loginValues.email,
          password: loginValues.password,
        });
        const resLoginData = response.data as LoginData;

        localStorage.setItem('loginData', JSON.stringify(resLoginData));
        setLoginData({ ...resLoginData, isLoggedIn: true });
        void router.push(`/${resLoginData.id}`);
      } catch (err) {
        setErrors({ ...errors, response: 'Invalid email/password' });
      }
    }
  };
  return (
    <>
      <div className={styles.loginCtn}>
        <Logo sxClass={'loginReg'} />
        <h2 className={styles.title}>Login</h2>
        <form noValidate>
          <LoginReg
            values={loginValues}
            setValues={setLoginValues}
            formSubmited={formSubmited}
            setFormSubmited={setFormSubmited}
            errors={errors}
            setErrors={setErrors}
          />
          <button className="submitBtn" type="submit" onClick={handleFormSubmit}>
            Login
          </button>
        </form>
        <p className={styles.helperText}>or continue with these social profile</p>
        <Socials />
        <p className={styles.helperText}>
          Don’t have an account yet?
          <span className={styles.btn} onClick={() => void router.push('/register')}>
            Register
          </span>
        </p>
      </div>
      <Footer sxClass="loginReg" />
    </>
  );
};

export default login;
