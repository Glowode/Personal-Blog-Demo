function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      © {currentYear} Acme Engineering
    </footer>
  );
}

export default Footer;
export { Footer };
