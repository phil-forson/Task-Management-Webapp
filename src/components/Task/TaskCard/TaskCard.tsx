import { useState } from "react";
import { TaskCardProps } from "../../../types";
import Modal from "../../Modal/Modal";
import TaskDetails from "../TaskDetails/TaskDetails";
import "./TaskCard.css";

const TaskCard = ({
  task,
  completed,
  totalNumOfSubtasks,
  description,
  subtasks,
  status,
}: TaskCardProps) => {
  const [viewTaskDetails, setViewTaskDetails] = useState(false);

  const openTaskDetails = () => {
    setViewTaskDetails(true);
    console.log("opeening task details");
  };

  const closeTaskDetails = () => {
    setViewTaskDetails(false);
    console.log("closingggg task details");
  };

  const handleOpenModal = () => {
    if (viewTaskDetails) {
      closeTaskDetails();
    } else {
      openTaskDetails();
    }
  };

  return (
    <div
      className="max-w-[280px] min-h-[88px] bg-white dark:bg-darkGrey dark:text-white rounded-[8px] mt-5 shadow-card child cursor-pointer"
      onClick={handleOpenModal}
    >
      <div className=" flex flex-col items-start mx-4 align-middle h-full justify-center py-5">
        <div className="font-jakartaBold">{task}</div>
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
                completed={completed}
                totalNumOfSubtasks={totalNumOfSubtasks}
                description={description}
                subtasks={subtasks}
                status={status}
                closeModal={closeTaskDetails}
              />
            </>
          }
        />
      )}
    </div>
  );
};

export default TaskCard;
