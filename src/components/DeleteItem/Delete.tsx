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
    <div className="tablet:px-7 mobile:px-5 py-5 bg-white tablet:w-[480px] mobile:w-[343px] h-[auto] dark:bg-darkGrey dark:text-white ">
      <div className="text-mainRed font-jakartaBold my-3 text-[18px] capitalize">
        Delete This {deleteType}?
      </div>
      <div className="font-jakartaSemi text-mediumGrey text-[13px]">
        {deleteText}
      </div>
      <div className="mt-5 mb-3 flex justify-between mobile:flex-col tablet:flex-row items-center ">
        <div className="h-[40px] tablet:w-[48%] mobile:w-full mobile:mb-3 tablet:mb-0 ">
          <Button
            text="Delete"
            icon={false}
            primary="#EA5555"
            hoverColor="mainRedHover"
            onClick={(e) => handleDelete(e)}
          />
        </div>
        <div className="h-[40px] tablet:w-[48%] mobile:w-full ">
          <Button
            text="Cancel"
            icon={false}
            primary={theme === "light" ? "#635FC71A" : "white"}
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
