import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (formData.fullName.trim().length < 3) {
      isValid = false;
      errors.fullName = "Full name must be at least 3 characters long.";
    }

    if (formData.subject.trim().length < 3) {
      isValid = false;
      errors.subject = "Subject must be at least 3 characters long.";
    }

    // Basic email regex validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      isValid = false;
      errors.email = "Enter a valid email address.";
    }

    if (formData.body.trim().length < 3) {
      isValid = false;
      errors.body = "Message body must be at least 3 characters long.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid! Send the data:", formData);
      alert("Your form has been sent successfully!"); 
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: '',
      });
    } else {
      console.log("Form has errors!");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}

        <input 
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {formErrors.subject && <p className="error">{formErrors.subject}</p>}

        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <textarea
          name="body"
          placeholder="Your Message"
          value={formData.body}
          onChange={handleChange}
        ></textarea>
        {formErrors.body && <p className="error">{formErrors.body}</p>}

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
