import React, { useContext, useEffect } from 'react';
import { AuthContext, UserDetails } from '../../context/authContext';
import styles from '../../styles/Details.module.scss';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const index = (): JSX.Element => {
  const router = useRouter();
  const { loginData, userDetails, setUserDetails } = useContext(AuthContext);

  useEffect(() => {
    if (loginData) {
      const getUserDetils = async (): Promise<void> => {
        try {
          const response = await axios({
            method: 'get',
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
            url: `/${loginData.id}`,
          });

          const resUserDetails = (await response.data) as UserDetails;
          setUserDetails(resUserDetails);
        } catch (err) {
          console.log(err);
        }
      };

      void getUserDetils();
    }
  }, [loginData]);

  const handleEditBtnClick = (): void => {
    void router.push(`/update/${loginData.id}`);
  };

  return (
    <>
      <Header />
      {userDetails && (
        <div className={styles.ctn}>
          <h2 className={styles.title}>Personal info</h2>
          <p className={styles.titleHelpText}>Basic info, like your name and photo</p>

          <div className={styles.wrapper}>
            <div className={styles.profileCtn}>
              <div className={styles.secTitleCtn}>
                <h3 className={styles.secTitle}>Profile</h3>
                <p className={styles.secTitleHelpText}>Some info may be visible to other people</p>
              </div>
              <button className={styles.editBtn} type="button" onClick={handleEditBtnClick}>
                Edit
              </button>
            </div>
            <ul>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>PHOTO</h6>
                {userDetails.photoUrl ? (
                  <img className={styles.img} src={userDetails.photoUrl} alt="profile picture" />
                ) : (
                  <PortraitIcon className={styles.img} />
                )}
              </li>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>NAME</h6>
                <span className={styles.detail}>{userDetails.name}</span>
              </li>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>BIO</h6>
                <span className={styles.detail}>{userDetails.bio}</span>
              </li>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>PHONE</h6>
                <span className={styles.detail}>{userDetails.phoneNum}</span>
              </li>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>EMAIL</h6>
                <span className={styles.detail}>{userDetails.email}</span>
              </li>
              <li className={styles.detailCtn}>
                <h6 className={styles.detailTitle}>PASSWORD</h6>
                <span className={styles.detail}>**********</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Footer sxClass="" />
    </>
  );
};

export default index;
