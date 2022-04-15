import React from 'react';
import Image from 'next/image';
import FbIcon from '../assets/Facebook.svg';
import Github from '../assets/Github.svg';
import Google from '../assets/Google.svg';
import Twitter from '../assets/Twitter.svg';
import styles from '../styles/Socials.module.scss';

const Socials = (): JSX.Element => {
  return (
    <div className={styles.ctn}>
      <Image src={FbIcon} alt="facebook" />
      <Image src={Github} alt="github" />
      <Image src={Google} alt="google" />
      <Image src={Twitter} alt="twitter" />
    </div>
  );
};

export default Socials;
