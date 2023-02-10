import React, { useState } from "react";

import Add from "../../assets/icon-add-task-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { NavProps } from "../../types";
import EditBoard from "../Board/EditBoard/EditBoard";
import Button from "../Button/Button";
import Delete from "../DeleteItem/Delete";
import Modal from "../Modal/Modal";
import Submenu from "../Submenu/Submenu";
import AddTask from "../Task/AddTask/AddTask";

const Nav = ({ currentTab, showSidebar }: NavProps) => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [editBoardOpen, setEditBoardOpen] = useState(false);
  const [deleteBoardOpen, setDeleteBoardOpen] = useState(false);

  const open = () => setOpenAddTask(true);

  const close = () => {
    setOpenAddTask(false);
  };

  const onOpenSubmenu = () => {
    console.log("toggling");
    setOpenSubmenu(true);
  };

  const onCloseSubmenu = () => {
    setOpenSubmenu(false)
  }


  const onOpenEditBoard = () => {
    setEditBoardOpen(true);
  };

  const onCloseEditBoard = () => setEditBoardOpen(false);

  const onOpenDeleteBoard = () => {
    setDeleteBoardOpen(true);
  };

  const onCloseDeleteBoard = () => setDeleteBoardOpen(false);

  const handleDeleteBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(currentTab, "deleted");
    onCloseDeleteBoard();
  };

  const handleCancelDeleteBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCloseDeleteBoard();
  };

  return (
    <>
      <div className="w-[100vw] h-[85px] relative">
        <div
          className={
            "w-[100vw] h-[85px] bg-white dark:bg-darkGrey   dark:border-darkLines z-10 flex overflow-hidden fixed"
          }
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          <div
            className={
              "h-full text-[24px] border-r-[1px] border-lightGrey  dark:border-darkLines dark:text-white w-[300px] flex justify-center items-center" +
              (!showSidebar
                ? " border-b-[1px] border-[rgba(228, 235, 250, 1)] dark:border-darkLines"
                : "")
            }
          >
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
              <div className="my-3 mr-12 cursor-pointer relative ">
                <svg
                  width="5"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={onOpenSubmenu}
                  onMouseLeave={onCloseSubmenu}
                  
                >
                  <g fill="#828FA3" fill-rule="evenodd">
                    <circle cx="2.308" cy="2.308" r="2.308" />
                    <circle cx="2.308" cy="10" r="2.308" />
                    <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
                </svg>
                {openSubmenu && (
                  <Submenu
                    submenu={[
                      { text: "Edit", onClick: onOpenEditBoard },
                      { text: "Delete", onClick: onOpenDeleteBoard },
                    ]}
                    position =  ' fixed right-[50px] top-[50px]'
                    onMouseLeave={onCloseSubmenu}
                    onMouseEnter={onOpenSubmenu}
                  />
                )}
              </div>
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

      {editBoardOpen && (
        <Modal handleClose={onCloseEditBoard} component={<EditBoard currentTab={currentTab} closeModal={onCloseEditBoard}/>} />
      )}

      {deleteBoardOpen && (
        <Modal
          handleClose={onCloseDeleteBoard}
          component={
            <Delete
              deleteText={`Are you sure you want to delete the ‘ ${currentTab} ’ board ? This action cannot be reversed.`}
              deleteType="board"
              handleDelete={handleDeleteBoard}
              handleCancel={handleCancelDeleteBoard}
            />
          }
        />
      )}
    </>
  );
};

export default Nav;
