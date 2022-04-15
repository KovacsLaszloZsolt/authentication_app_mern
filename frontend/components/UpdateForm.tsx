import React, { useContext, useState } from 'react';
import styles from '../styles/UpdateForm.module.scss';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { AuthContext, UserDetails } from '../context/authContext';
import axios from 'axios';
import { useRouter } from 'next/router';

type UpdateUser = {
  photoUrl?: string;
  name?: string;
  bio?: string;
  phoneNum?: number | string;
  email?: string;
  password?: string;
};

const UpdateForm = (): JSX.Element => {
  const router = useRouter();
  const { loginData, userDetails, setUserDetails } = useContext(AuthContext);
  const [updateUser, setUpdateUser] = useState<UpdateUser>({ ...userDetails });
  const [emailError, setEmailError] = useState('');
  const [userImg, setUserImg] = useState<File | null>(null);

  const handleUpdateUser = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    key: string,
  ): void => {
    setUpdateUser({ ...updateUser, [key]: e.target.value });
  };

  const handleImgUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files[0];
    console.log(file);
    const path = URL.createObjectURL(file);
    setUpdateUser({ ...updateUser, photoUrl: path });
    setUserImg(file);
  };

  const validateEmail = (): void => {
    if (updateUser.email) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(updateUser.email)) {
        setEmailError('Email formation invalid!');
        return;
      }

      setEmailError('');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    validateEmail();

    if (!emailError) {
      const updatedFields = {} as UpdateUser;
      Object.keys(updateUser).forEach((key) => {
        if (userDetails[key] !== updateUser[key]) {
          key === 'password' && !updateUser.password.length
            ? ''
            : (updatedFields[key] = updateUser[key] as UserDetails);
        }
      });

      const formData = new FormData();

      if (userImg) {
        formData.append('image', userImg);
      }

      Object.entries(updatedFields).forEach((entry) => formData.append(entry[0], entry[1] as string));

      try {
        const response = await axios({
          method: 'put',
          headers: {
            Authorization: `Bearer ${loginData.token}`,
          },
          url: `http://127.0.0.1:3001/${loginData.id}`,
          data: formData,
        });
        const updatedUser = (await response.data) as UserDetails;
        setUserDetails({ ...updatedUser });

        void router.push(`/${loginData.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={styles.photoCtn}>
        <input type="file" id="profilePicture" accept=".jpg,.jpeg,.png,.gif" hidden onChange={handleImgUpdate} />
        <label className={styles.label} htmlFor="profilePicture">
          {updateUser.photoUrl ? (
            <>
              <PhotoCameraIcon className={styles.camera} />
              <img className={styles.image} src={updateUser.photoUrl} alt="profile picture" />
            </>
          ) : (
            <PhotoCameraIcon className={styles.photoIcon} />
          )}
        </label>
        <span className={styles.photoText}>CHANGE PHOTO</span>
      </div>
      <form className={styles.form}>
        <div className={styles.inputCtn}>
          <label className={styles.inputLabel} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            // value={updateUser.name}
            value={updateUser.name ? updateUser.name : ''}
            onChange={(e) => handleUpdateUser(e, 'name')}
          />
        </div>
        <div className={styles.inputCtn}>
          <label className={styles.inputLabel} htmlFor="bio">
            Bio
          </label>
          <textarea
            className={styles.textarea}
            name="bio"
            id="bio"
            placeholder="Enter your bio"
            value={updateUser.bio}
            onChange={(e) => handleUpdateUser(e, 'bio')}
          ></textarea>
        </div>
        <div className={styles.inputCtn}>
          <label className={styles.inputLabel} htmlFor="phone">
            Phone
          </label>
          <input
            className={styles.input}
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter your phone"
            value={updateUser.phoneNum}
            onChange={(e) => handleUpdateUser(e, 'phoneNum')}
          />
        </div>
        <div className={styles.inputCtn}>
          <label className={styles.inputLabel} htmlFor="email">
            Phone
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={updateUser.email}
            onChange={(e) => handleUpdateUser(e, 'email')}
          />
        </div>
        <div className={styles.inputCtn}>
          <label className={styles.inputLabel} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={updateUser.password}
            onChange={(e) => handleUpdateUser(e, 'password')}
          />
        </div>
        <button className={`${styles.saveBtn} submitBtn`} type="submit" onClick={handleFormSubmit}>
          Save
        </button>
      </form>
    </>
  );
};

export default UpdateForm;
