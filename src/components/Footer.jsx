function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-copyright">© {currentYear} Your Company Name</p>
    </footer>
  );
}

export default Footer;
export { Footer };
