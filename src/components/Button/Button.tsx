import React from "react";

import Add from "../../assets/icon-add-task-mobile.svg";
import { ButtonProps } from "../../types";

const Button = ({ text, onClick, color, primary, icon=true, type }: ButtonProps) => {
  return (
    <button
      className={
        "  rounded-[24px] w-full h-full outline-none border-none " +
        (color ? `text-${color} ` : "text-white ") +
        (primary ? `bg-${primary} ` : "bg-mainPurple")
      }
      onClick={onClick}
      type={type}
    >
      <div className="flex mx-4 justify-center h-full items-center cursor-pointer">
        {/* <img src={Add} className="w-2 h-2 mr-2 text-red-100" /> */}
        {icon && (
          <svg
            width="12"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
            className={
              " mr-2 " + (color ? "fill-" + color + " " : "fill-white")
            }
          >
            <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
          </svg>
        )}

        <div className="h-fit text-[15px] font-jakartaBold">{text}</div>
      </div>
    </button>
  );
};

export default Button;
