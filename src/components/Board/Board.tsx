import React, { useContext, useEffect, useState } from "react";
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
  isLoadingBoards,
}: BoardProps) => {
  const [openEditBoard, setOpenEditBoard] = useState(false);

  const open = () => setOpenEditBoard(true);

  const close = () => setOpenEditBoard(false);

  const { setData } = useContext(BoardContext);

  useEffect(() => {
    console.log("data from board component");
    console.log(data);
  }, []);

  return (
    <BoardContext.Provider value={currentTab}>
      {isLoadingBoards ? (
        <div className="p-4 bg-lightGrey min-h-screen max-h-full dark:bg-veryDarkGrey flex-1 overflow-auto flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              margin: "auto",
              background: "transparent",
              display: "block",
              shapeRendering: "auto",
            }}
            width="40px"
            height="40px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className=" fill-mainPurple "
          >
            <path
              d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
              stroke="#635FC7"
              strokeWidth={5}
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
        </div>
      ) : data ? (
        <>
          <div
            className=" p-4 bg-lightGrey min-h-screen max-h-[100vh] dark:bg-veryDarkGrey flex-1 overflow-auto "
            style={{ gridColumn: 2, gridRow: 2 }}
          >
            <Task currentTab={currentTab} data={data} addColumn={open} />
            {!showSidebar && <Showsidebar setShowSidebar={setShowSidebar} />}
          </div>
          {openEditBoard && (
            <Modal
              handleClose={close}
              component={
                <EditBoard
                  closeModal={close}
                  currentTab={currentTab}
                  addColumn={true}
                />
              }
            />
          )}
        </>
      ) : (
        <Emptyboard />
      )}
    </BoardContext.Provider>
  );
};

export default Board;
