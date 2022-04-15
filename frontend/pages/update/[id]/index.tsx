import React from 'react';
import styles from '../../../styles/Update.module.scss';
import UpdateForm from '../../../components/UpdateForm';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

const index = (): JSX.Element => {
  const router = useRouter();

  const handleBackBtnClick = (): void => {
    router.back();
  };

  return (
    <>
      <Header />
      <div className={styles.updateCtn}>
        <div className={styles.backBtnCtn}>
          <span className={styles.backBtn} onClick={handleBackBtnClick}>
            <ArrowBackIosIcon className={styles.backBtnIcon} />
            <span>Back</span>
          </span>
        </div>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Change Info</h2>
          <p className={styles.titleHelpText}>Changes will be reflected to every services</p>
          <UpdateForm />
        </div>
      </div>
      <Footer sxClass="" />
    </>
  );
};

export default index;
