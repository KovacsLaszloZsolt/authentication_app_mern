import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = ({ sxClass }: { sxClass: string }): JSX.Element => {
  return (
    <footer className={`${styles.footer} ${styles[sxClass]}`}>
      <span>created by Laszlo Kovacs</span>
      <span>devChallenges.io</span>
    </footer>
  );
};

export default Footer;
