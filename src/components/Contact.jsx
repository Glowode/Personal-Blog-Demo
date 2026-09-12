function Contact() {
  const email = 'your-email@example.com';

  return (
    <section>
      <h2>Contact</h2>
      <p>Feel free to reach out!</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </section>
  );
}

export default Contact;
export { Contact };
