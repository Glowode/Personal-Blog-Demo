import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      © {currentYear} Acme Engineering
    </footer>
  );
}

export default Footer;
export { Footer };
