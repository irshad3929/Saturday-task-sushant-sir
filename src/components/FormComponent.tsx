import React from "react";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../Hooks/UseCustomForm";
import "./FormComponent.css";

const FormComponent: React.FC = () => {
  const { register, handleSubmit, errors } = useCustomForm();
  const navigate = useNavigate();

  const onSubmit = (data: { [key: string]: string }) => {
    navigate("/form-data", { state: { formData: data } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Personal Details</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className="form-input"
          {...register("name", { required: true })}
          placeholder="Enter your name"
          autoComplete="name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className="form-input"
          {...register("email", { required: true })}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-input"
          {...register("password", { required: true })}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          className="form-input"
          {...register("message", { required: true })}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
