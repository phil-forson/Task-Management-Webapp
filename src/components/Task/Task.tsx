import { useEffect, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { TaskProps } from "../../types";
import AddColumnTab from "../Column/AddColumnTab/AddColumnTab";
import AddTask from "./AddTask/AddTaskColumn/AddTask";
import TaskItem from "./TaskItem/TaskItem";

const Task = ({ currentTab, data, addColumn }: TaskProps) => {
  const [taskObj, setTaskObj] = useState<any>({});
  const [columns, setColumns] = useState<any>([]);

  const getColumns = () => {
    let columns: Array<any> = [];
    taskObj?.columns?.map((item: any) => columns.push(item.name));
    console.log(columns);
  };

  useEffect(() => {
    setTaskObj(data.boards.find((item: any) => item.name == currentTab));
    getColumns();
  }, [currentTab]);
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
          columns={columns}
        />
      ))}
      <AddColumnTab addColumn={addColumn} />

    </div>
    </>
  );
};

export default Task;
