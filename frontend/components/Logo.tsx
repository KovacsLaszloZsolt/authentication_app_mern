import Image from 'next/image';
import logo from '../public/logo.svg';
import logoLight from '../public/logo-light.svg';
import styles from '../styles/Logo.module.scss';

const Logo = ({ sxClass }: { sxClass: string }): JSX.Element => {
  return (
    <div className={styles[sxClass]}>
      <Image src={logo} alt="logo" />
    </div>
  );
};
export default Logo;
