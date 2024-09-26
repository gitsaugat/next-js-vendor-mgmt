import React, { useState } from "react";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";

const ResponsiveForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextAreaField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <SubmitButton text="Submit" />
      </form>
    </div>
  );
};

export default ResponsiveForm;
