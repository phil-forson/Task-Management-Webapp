import React, { useState } from "react";

import Add from "../../assets/icon-add-task-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { NavProps } from "../../types";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import AddTask from "../Task/AddTask/AddTaskColumn/AddTask";

const Nav = ({ currentTab, showSidebar }: NavProps) => {
  const [openAddTask, setOpenAddTask] = useState(false);

  const open = () => setOpenAddTask(true);

  const close = () => {
    setOpenAddTask(false);
    console.log("now the day is overrrrrr");
  };

  return (
    <div className="w-[100vw] h-[85px] relative">
      <div
        className={"w-[100vw] h-[85px] bg-white dark:bg-darkGrey   dark:border-darkLines z-10 flex overflow-hidden fixed"}
        style={{ gridColumn: 1, gridRow: 1 }}
      >
        <div className={"h-full text-[24px] border-r-[1px] border-lightGrey  dark:border-darkLines dark:text-white w-[300px] flex justify-center items-center" + (!showSidebar ? " border-b-[1px] border-[rgba(228, 235, 250, 1)] dark:border-darkLines": "")}>
          <div className="font-jakartaBold">Kaban</div>
        </div>
        <div
          className="flex h-full grow justify-between border-b-[1px] dark:border-darkLines dark:text-white overflow-hidden"
          style={{ gridColumn: 2, gridRow: 1 }}
        >
          <div className="text-[24px] my-5 ml-3 font-bold font-jakartaBold">
            {currentTab}
          </div>
          <div className="flex my-5 ">
            <div className="h-full mr-8">
              <Button text="Add New Task" onClick={open} />
            </div>
            <div className="my-3 mr-12">
              <img src={Ellipsis} />
            </div>
          </div>
        </div>
      </div>
      {openAddTask && (
        <Modal
          handleClose={close}
          component={<AddTask handleCloseModal={close} />}
        />
      )}
    </div>
  );
};

export default Nav;
