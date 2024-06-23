import React from "react";
import { useLocation } from "react-router-dom";
import "./FormDataDisplay.css";

const FormDataDisplay: React.FC = () => {
  const location = useLocation();
  const { formData } = location.state as {
    formData: { [key: string]: string };
  };

  return (
    <div className="form-data-display">
      <h2>Submitted Form Data</h2>
      <div className="form-data-item">
        <strong>Name:</strong> {formData.name}
      </div>
      <div className="form-data-item">
        <strong>Email:</strong> {formData.email}
      </div>
      <div className="form-data-item">
        <strong>Password:</strong> {formData.password}
      </div>
      <div className="form-data-item">
        <strong>Message:</strong> {formData.message}
          </div>
          <button onClick={() => window.history.back()} className="form-button">Back</button>
      </div>
  );
};

export default FormDataDisplay;
