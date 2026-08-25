import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const appName = 'Acme Engineering';

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © {currentYear} {appName}
      </p>
    </footer>
  );
}

export default Footer;
export { Footer };
