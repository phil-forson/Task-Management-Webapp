import axios from "axios";
import { useContext, useState } from "react";
import { AllBoardsContext } from "../../../contexts/AllBoardsContext";
import { CurrentBoardContext } from "../../../contexts/CurrentBoardContext";
import { TaskCardProps } from "../../../types";
import Delete from "../../DeleteItem/Delete";
import Modal from "../../Modal/Modal";
import EditTask from "../EditTask/EditTask";
import TaskDetails from "../TaskDetails/TaskDetails";
import "./TaskCard.css";

const TaskCard = ({
  task,
  taskTitle,
  completed,
  totalNumOfSubtasks,
  description,
  subtasks,
  status,
  columnId,
}: TaskCardProps) => {
  const [viewTaskDetails, setViewTaskDetails] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openTaskDetails = () => {
    setViewTaskDetails(true);
  };

  const closeTaskDetails = () => {
    setViewTaskDetails(false);
  };

  const { data, setData } = useContext(AllBoardsContext);

  const currentTabId = useContext(CurrentBoardContext);

  const openDeleteModal = () => setDeleteModalOpen(true);

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);

  const closeEditModal = () => setEditModalOpen(false);

  const deleteTask = (reqObj: any) => {
    const backendUrl =
      import.meta.env.VITE_REACT_APP_BASE_URL + "/" + currentTabId;
    axios.patch(backendUrl, reqObj).then((res) => {
      if (res.status === 200) {
        const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, ...reqObj } : { ...board }
        );
        setData(newArr);
        closeDeleteModal();
      }
    });
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(taskTitle, "deleted");
    const boardToUpdate = data.find((board: any) => board.id === currentTabId);

    boardToUpdate.columns.find((column: any) => column.id === columnId).tasks =
      boardToUpdate.columns
        .find((column: any) => column.id === columnId)
        .tasks.filter((item: any) => item.id !== task.id);
    console.log(boardToUpdate);
    deleteTask(boardToUpdate);
  };

  const handleCancelDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeDeleteModal();
  };

  const handleOpenModal = () => {
    if (viewTaskDetails) {
      closeTaskDetails();
    } else {
      openTaskDetails();
    }
  };

  return (
    <>
      <div
        className="max-w-[280px] min-h-[88px] bg-white dark:bg-darkGrey dark:text-white rounded-[8px] mt-5 shadow-card child cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className=" flex flex-col items-start mx-4 align-middle h-full justify-center py-5">
          <div className="font-jakartaBold">{taskTitle}</div>
          <div className="font-jakartaBold tracking-tighter text-mediumGrey text-[12px]">
            {completed} of {totalNumOfSubtasks} substasks
          </div>
        </div>
        {viewTaskDetails && (
          <Modal
            handleClose={closeTaskDetails}
            component={
              <>
                <TaskDetails
                  task={task}
                  taskTitle={taskTitle}
                  completed={completed}
                  totalNumOfSubtasks={totalNumOfSubtasks}
                  description={description}
                  subtasks={subtasks}
                  status={status}
                  closeModal={closeTaskDetails}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
                  columnId={columnId}
                />
              </>
            }
          />
        )}
      </div>
      {editModalOpen && (
        <Modal
          handleClose={closeEditModal}
          component={<EditTask handleCloseModal={closeEditModal} task={task} />}
        />
      )}
      {deleteModalOpen && (
        <Modal
          handleClose={closeDeleteModal}
          component={
            <Delete
              deleteText={`Are you sure you want to delete the ‘ ${taskTitle} ’ task and its subtasks? This action cannot be reversed.`}
              deleteType="task"
              handleDelete={handleDeleteTask}
              handleCancel={handleCancelDeleteTask}
            />
          }
        />
      )}
    </>
  );
};

export default TaskCard;
