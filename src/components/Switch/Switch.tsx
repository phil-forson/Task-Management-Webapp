import React from "react";
import "./Switch.css";

const Switch = ({ onSwitchChange, darkMode }: any) => {
  return (
    <label className="switch-label">
      <input
        type="checkbox"
        className="switch-input"
        onChange={(e) => onSwitchChange(e)}
        defaultChecked={darkMode}
      />
      <span className="switch-span"></span>
    </label>
  );
};

export default Switch;
