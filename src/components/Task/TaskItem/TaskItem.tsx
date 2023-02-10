import React, { useEffect, useState } from "react";
import { TaskItemProps } from "../../../types";
import Modal from "../../Modal/Modal";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import './TaskItem.css'

const TaskItem = ({
  name,
  tasks,
  tasksLength,
  columns
}: any) => {
 

  useEffect(() => {
    console.log(columns)
  }, [])
  const findCompletedTasks = (task: any) => {
    return task.isCompleted == true;
  };


  return (
    <div className="child min-w-[280px] min-h-[88px]">
     <div className="flex items-center">
        <div
          className={
            "rounded-full w-[15px] h-[15px] " +
            (name == "Doing"
              ? "bg-[#8471F2]"
              : name == "Done"
              ? "bg-[#67E2AE]"
              : "bg-[#49C4E5]")
          }
        ></div>
        <div className="ml-5 tracking-widest font-jakartaBold text-mediumGrey ">
          {name} ( {tasksLength} )
        </div>
      </div>
      {tasks.map((task: any, i: number) => (
        <TaskCard
          task={task.title}
          status={task.status}
          completed={task.subtasks.filter(findCompletedTasks).length}
          totalNumOfSubtasks={task.subtasks.length}
          description={task.description}
          subtasks={task.subtasks}
          key={i}
        />
      ))}

    </div>
  );
};

export default TaskItem;
