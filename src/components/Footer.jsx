function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      © {currentYear} My Company
    </footer>
  );
}

export default Footer;
export { Footer };
