import React, { useEffect, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { BoardProps } from "../../types";
import Modal from "../Modal/Modal";
import Task from "../Task/Task";
import EditBoard from "./EditBoard/EditBoard";
import Emptyboard from "./Emptyboard/Emptyboard";
import Showsidebar from "./Showsidebar/Showsidebar";

const Board = ({
  showSidebar,
  setShowSidebar,
  currentTab,
  data,
}: BoardProps) => {
  const [openEditBoard, setOpenEditBoard] = useState(false);

  const open = () => setOpenEditBoard(true);

  const close = () => setOpenEditBoard(false);

  return (
    <BoardContext.Provider value={currentTab}>
      <div
        className=" p-4 bg-lightGrey min-h-screen max-h-[100vh] dark:bg-veryDarkGrey flex-1 overflow-auto "
        style={{ gridColumn: 2, gridRow: 2 }}
      >
        {/* <Emptyboard columnsList={columnsList}/> */}
        <Task currentTab={currentTab} data={data} addColumn={open} />
        {!showSidebar && <Showsidebar setShowSidebar={setShowSidebar} />}
      </div>
      {openEditBoard && (
        <Modal
          handleClose={close}
          component={<EditBoard closeModal={close} currentTab={currentTab} />}
        />
      )}
    </BoardContext.Provider>
  );
};

export default Board;
