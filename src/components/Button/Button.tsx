import React from "react";

import Add from "../../assets/icon-add-task-mobile.svg";
import { ButtonProps } from "../../types";

const Button = ({
  text,
  onClick,
  color,
  primary,
  icon = true,
  type,
  hoverColor,
  onlyIcon,
  isLoading = false,
}: ButtonProps) => {
  const getButtonBg = (color: string) => {
    const bg = "";
    if (color === "#635FC71A") {
    }
  };

  return (
    <button
      className={
        "  rounded-[24px] h-full outline-none border-none " +
        (color ? `text-${color} ` : "text-white ") +
        (primary ? `bg-[${primary}]` : " bg-mainPurple") +
        (hoverColor ? `hover:bg-${hoverColor} ` : "hover:bg-mainPurpleHover ") +
        (onlyIcon ? " mobile:w-[54px] tablet:w-full " : " w-full ")
      }
      onClick={onClick}
      type={type}
      style={{ backgroundColor: primary ? primary : "#635FC7" }}
      disabled={isLoading}
    >
      <div
        className={
          "flex mx-4 justify-center h-full items-center "
        }
      >
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              margin: "auto",
              background: "transparent",
              display: "block",
              shapeRendering: "auto",
            }}
            width="20px"
            height="20px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className=" fill-lightPurple "
          >
            <path
              d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
              stroke="#fff"
              strokeWidth={10}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="1s"
                repeatCount="indefinite"
                keyTimes="0;1"
                values="0 50 51;360 50 51"
              ></animateTransform>
            </path>
          </svg>
        ) : (
          <>
            {icon && (
              <svg
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                className={
                  " align-middle " +
                  (color ? "fill-" + color + " " : "fill-white ") +
                  (onlyIcon ? " mobile:mr-0 tablet:mr-2 " : " mr-2 ")
                }
              >
                <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
              </svg>
            )}
            <div
              className={
                "h-fit text-[15px] font-jakartaBold " +
                (onlyIcon && "mobile:hidden tablet:block")
              }
            >
              {text}
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
