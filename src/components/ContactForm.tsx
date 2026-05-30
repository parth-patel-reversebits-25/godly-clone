"use client";

export function ContactForm() {
  return (
    <form method="post" onSubmit={(e) => e.preventDefault()}>
      <div className="form-holder">
        <div className="input-holder half">
          <label>First Name</label>
          <input type="text" name="first-name" required />
        </div>
        <div className="input-holder half">
          <label>Last Name</label>
          <input type="text" name="last-name" required />
        </div>
        <div className="input-holder half">
          <label>Phone</label>
          <input type="tel" name="phone" />
        </div>
        <div className="input-holder half">
          <label>Email</label>
          <input type="email" name="the-email" required />
        </div>
        <div className="input-holder">
          <label>Message</label>
          <textarea name="the-message" required />
        </div>
        <div className="input-holder">
          <input type="submit" value="submit" />
        </div>
      </div>
    </form>
  );
}
