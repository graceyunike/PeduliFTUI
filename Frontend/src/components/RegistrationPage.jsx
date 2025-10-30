import React from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="left-side">
        {/* Nanti diisi logo dan quotes */}
      </div>

      <div className="right-side">
        <h2>Registration</h2>
        <form className="register-form">
          <input type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Create password" />
          <select>
            <option value="">Register as...</option>
            <option value="donor">Donor</option>
            <option value="organization">Organization</option>
          </select>
          <button type="submit">Register Now</button>
          <p className="login-text">
            Already have an account? <a href="#">Login now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
