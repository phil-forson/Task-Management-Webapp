import { useEffect, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { TaskProps } from "../../types";
import AddColumnTab from "../Column/AddColumnTab/AddColumnTab";
import AddTask from "./AddTask/AddTask";
import TaskItem from "./TaskItem/TaskItem";

const Task = ({ currentTab, data, addColumn }: TaskProps) => {
  const [taskObj, setTaskObj] = useState<any>({});

  useEffect(() => {
    setTaskObj(data.find((item: any) => item.name == currentTab));
  }, [currentTab]);

  useEffect(() => {
    console.log("task obj");
    console.log(taskObj);
  }, [taskObj]);
  return (
    <>
      <div className="grid gap-4 mt-5">
        {taskObj?.columns?.map((item: any, i: any) => (
          <TaskItem
            key={i}
            name={item.name}
            description={item.description}
            tasks={item.tasks}
            subtasks={item.tasks.subtasks}
            tasksLength={item.tasks.length}
          />
        ))}
        <AddColumnTab addColumn={addColumn} />
      </div>
    </>
  );
};

export default Task;
