import React from "react";
import { CheckboxProps } from "../../types";
import "./Checkbox.css";

const Checkbox = ({ element, checked, onChange, index }: CheckboxProps) => {
  return (
    <div className="relative mb-5">
      <label
        htmlFor={element}
        className={
          "bg-lightGrey dark:bg-veryDarkGrey flex h-auto w-full pl-9 font-jakartaBold items-center text-[13px] py-3 cursor-pointer hover:bg-mainPurple dark:hover:bg-lightPurple " +
          (checked
            ? "line-through text-mediumGrey"
            : "text-black dark:text-white")
        }
        style={{ userSelect: "none" }}
      >
        {element}
      </label>
      <input
        type="checkbox"
        checked={checked}
        value={element}
        id={element}
        className="absolute checkbox left-5 h-full checkbox dark:bg-darkGrey border-none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e, index)
        }
      />
    </div>
  );
};

export default Checkbox;
