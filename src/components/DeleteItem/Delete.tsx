import React, { ReactElement, ReactNode, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";

export type DeleteProps = {
  deleteType: string;
  deleteText: React.ReactNode;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Delete = ({
  deleteType,
  deleteText,
  handleDelete,
  handleCancel,
}: DeleteProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="px-7 py-5 bg-white w-[480px] h-[auto] dark:bg-darkGrey dark:text-white ">
      <div className="text-mainRed font-jakartaBold my-3 text-[18px] capitalize">
        Delete This {deleteType}?
      </div>
      <div className="font-jakartaLight text-mediumGrey text-[13px]">
        {deleteText}
      </div>
      <div className="mt-5 mb-3 flex justify-between">
        <div className="h-[40px] w-[48%]">
          <Button
            text="Delete"
            icon={false}
            primary="mainRed"
            hoverColor="mainRedHover"
            onClick={(e) => handleDelete(e)}
          />
        </div>
        <div className="h-[40px] w-[48%]">
          <Button
            text="Cancel"
            icon={false}
            primary={theme === "light" ? "lightPurple" : "white"}
            color="mainPurple"
            hoverColor={theme === "light" ? "lightPurpleHover" : "white"}
            onClick={(e) => handleCancel(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Delete;
