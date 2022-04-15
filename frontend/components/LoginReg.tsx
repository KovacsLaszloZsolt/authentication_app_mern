import React, { Dispatch, SetStateAction, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styles from '../styles/LoginReg.module.scss';
import { UserInfo, Errors } from '../pages/login';

const LoginReg = ({
  values,
  setValues,
  formSubmited,
  errors,
  setErrors,
}: {
  values: UserInfo;
  setValues: Dispatch<SetStateAction<UserInfo>>;
  formSubmited: boolean;
  setFormSubmited: Dispatch<SetStateAction<boolean>>;
  errors: Errors;
  setErrors: Dispatch<SetStateAction<Errors>>;
}): JSX.Element => {
  // const inputFields = ['email', 'password'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    setValues({ ...values, [key]: e.target.value });
  };

  useEffect(() => {
    if (formSubmited) {
      if (!values.email) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email required!' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }

      if (values.email) {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(values.email)) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Email formation invalid!' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
      }

      if (!values.password) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Password required!' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }
    }
  }, [values, formSubmited]);

  return (
    <>
      <div className={styles.inputCtn}>
        <label className={styles.label} htmlFor="email">
          <EmailIcon />
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => handleInputChange(e, 'email')}
          required
        />
      </div>
      {errors.email && <p className="errorMsg">{errors.email}</p>}
      <div className={styles.inputCtn}>
        <label className={styles.label} htmlFor="password">
          <LockIcon />
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => handleInputChange(e, 'password')}
          required
        />
      </div>
      {errors.password && <p className="errorMsg">{errors.password}</p>}
      {errors.response && <p className="errorMsg">{errors.response}</p>}
    </>
  );
};

export default LoginReg;
