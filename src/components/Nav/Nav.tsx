import React, { useContext, useState } from "react";

import { ColumnsContext } from "../../contexts/ColumnsContext";
import { NavProps } from "../../types";
import EditBoard from "../Board/EditBoard/EditBoard";
import Button from "../Button/Button";
import Delete from "../DeleteItem/Delete";
import Modal from "../Modal/Modal";
import SidebarModal from "../SidebarModal/SidebarModal";
import Submenu from "../Submenu/Submenu";
import AddTask from "../Task/AddTask/AddTask";

const Nav = ({
  currentTab,
  showSidebar,
  setCurrentTab,
  data,
  openBoardModal,
  closeBoardModal,
}: NavProps) => {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [editBoardOpen, setEditBoardOpen] = useState(false);
  const [deleteBoardOpen, setDeleteBoardOpen] = useState(false);
  const [sidebarModalOpen, setSidebarModalOpen] = useState(false);

  const open = () => setOpenAddTask(true);

  const close = () => {
    setOpenAddTask(false);
  };

  const onOpenSubmenu = () => {
    console.log("toggling");
    setOpenSubmenu(true);
  };

  const onCloseSubmenu = () => {
    setOpenSubmenu(false);
  };

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

  const openSidebarModal = () => setSidebarModalOpen(true);

  const closeSidebarModal = () => setSidebarModalOpen(false);

  const openBoardFromSidebarModal = () => {
    closeSidebarModal();
    openBoardModal();
  };

  const onChangeColumn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTab(e.target.value);
  };

  const columnList = useContext(ColumnsContext);

  return (
    <>
      <div className="w-[100vw] h-[85px] relative">
        <div
          className={
            "w-full h-[85px] bg-white dark:bg-darkGrey   dark:border-darkLines z-10 flex overflow-hidden fixed md:fixed sm:fixed sm:w-full md:w-full"
          }
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          <div
            className={
              "h-full text-[24px] border-r-[1px] border-lightGrey mobile:hidden tablet:flex  dark:border-darkLines dark:text-white laptop:min-w-[300px] tablet:min-w-[261px] flex justify-between tablet:px-16 laptop:px-20 items-center " +
              (!showSidebar
                ? " border-b-[1px] border-[rgba(228, 235, 250, 1)] dark:border-darkLines"
                : "")
            }
          >
            <div className="pl-5 cursor-pointer" onClick={openSidebarModal}>
              <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="#635FC7" fill-rule="evenodd">
                  <rect width="6" height="25" rx="2" />
                  <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                  <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                </g>
              </svg>
            </div>
            <div className="font-jakartaBold ">Kaban</div>
          </div>
          <div
            className="flex h-full grow items-center justify-between border-b-[1px] dark:border-darkLines dark:text-white overflow-hidden"
            style={{ gridColumn: 2, gridRow: 1 }}
          >
            <div className="flex items-center">
              <div
                className="pl-5 tablet:hidden laptop:hidden mobile:block cursor-pointer"
                onClick={openSidebarModal}
              >
                <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#635FC7" fill-rule="evenodd">
                    <rect width="6" height="25" rx="2" />
                    <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                    <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                  </g>
                </svg>
              </div>
              <div className="laptop:text-[24px] tablet:text-[20px] my-5 ml-3 font-bold font-jakartaBold tablet:block mobile:hidden">
                {currentTab}
              </div>
              <select
                className="outline-none border-none my-5 ml-3 font-bold font-jakartaBold tablet:hidden  dark:bg-darkGrey dark:border-tintedMediumGrey"
                value={currentTab}
                onChange={(e) => onChangeColumn(e)}
              >
                {data.boards.map((board: any, index: number) => (
                  <option value={board.name} key={index}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex my-5 ">
              <div className="h-[40px] mr-8">
                <Button text="Add New Task" onClick={open} onlyIcon={true} />
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
                    position=" fixed right-[30px] top-[52px]"
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
        <Modal
          handleClose={onCloseEditBoard}
          component={
            <EditBoard currentTab={currentTab} closeModal={onCloseEditBoard} />
          }
        />
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

      {sidebarModalOpen && (
        <Modal
          handleClose={closeSidebarModal}
          component={
            <SidebarModal
              closeModal={closeSidebarModal}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              openBoardModal={openBoardFromSidebarModal}
            />
          }
        />
      )}
    </>
  );
};

export default Nav;
