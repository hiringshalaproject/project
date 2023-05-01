import React, { useState } from "react";
import RoundButton from "./RoundButton";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // submit the new password to the backend or API
    console.log("New password: ", password);
  };

  return (
    <div>
      <div onClick={() => setDropdownOpen(!dropdownOpen)}>
        <h1
          className="changePassword"
          style={{ marginTop: "17px", fontSize: "20px" }}
        >
          Change Password
        </h1>
      </div>
      {dropdownOpen && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && <div>{passwordError}</div>}
          <RoundButton text="Submit" className="styled-button" />
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
