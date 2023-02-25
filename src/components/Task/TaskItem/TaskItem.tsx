import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskItem.css";

const TaskItem = ({ name, tasks, tasksLength, columnId }: any) => {
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
          task={task}
          taskTitle={task.title}
          status={task.status}
          completed={task.subtasks.filter(findCompletedTasks).length}
          totalNumOfSubtasks={task.subtasks.length}
          description={task.description}
          subtasks={task.subtasks}
          columnId={columnId}
          key={i}
        />
      ))}
    </div>
  );
};

export default TaskItem;
