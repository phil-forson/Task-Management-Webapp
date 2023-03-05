import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./AddColumnTab.css";

const AddColumnTab = ({ addColumn }: any) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("theme from add column");
    console.log(theme);
    console.log(theme === "light");
  }, []);

  return (
    <div
      className={
        "child w-[280px] min-h-full flex justify-center items-center font-jakartaBold dark:bg-[rgba(43, 44, 55, 0.25)] text-2xl mt-11 cursor-pointer text-mediumGrey " +
        (theme === "light" ? "light-column-bg" : "dark-column-bg")
      }
      onClick={addColumn}
    >
      <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#828FA3"
          d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
        />
      </svg>
      <div className="ml-2">New Columns {theme === "light"}</div>
    </div>
  );
};

export default AddColumnTab;
