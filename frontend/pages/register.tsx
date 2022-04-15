import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import LoginReg from '../components/LoginReg';
import Socials from '../components/Socials';
import { AuthContext, LoginData } from '../context/authContext';
import styles from '../styles/Register.module.scss';
import { UserInfo, Errors } from './login';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const register = (): JSX.Element => {
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
        const response = await axios.post('http://127.0.0.1:3001/register', {
          email: loginValues.email,
          password: loginValues.password,
        });
        // void router.push(`/:id`);
        const resLoginData = response.data as LoginData;
        localStorage.setItem('loginData', JSON.stringify(resLoginData));
        setLoginData({ ...resLoginData, isLoggedIn: true });
        void router.push(`/${resLoginData.id}`);
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response.status);
        setErrors({
          ...errors,
          response: error.response.status === 409 ? 'User already exist!' : 'Something went wrong. Try again!',
        });
      }
    }
  };
  return (
    <>
      <div className={styles.registerCtn}>
        <Logo sxClass={'loginReg'} />
        <p className={styles.textImp}>Join thousands of learners from around the world </p>
        <p className={styles.text}>
          Master web development by making real-life projects. There are multiple paths for you to choose
        </p>
        <form>
          <LoginReg
            values={loginValues}
            setValues={setLoginValues}
            formSubmited={formSubmited}
            setFormSubmited={setFormSubmited}
            errors={errors}
            setErrors={setErrors}
          />
          <button className="submitBtn" type="submit" onClick={handleFormSubmit}>
            Start coding now
          </button>
        </form>
        <p className={styles.helperText}>or continue with these social profile</p>
        <Socials />
        <p className={styles.helperText}>
          Adready a member?{' '}
          <span className={styles.btn} onClick={async () => router.push('/login')}>
            Login
          </span>
        </p>
      </div>
      <Footer sxClass={'loginReg'} />
    </>
  );
};

export default register;
