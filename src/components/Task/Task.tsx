import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../contexts/BoardContext";
import { CurrentBoardContext } from "../../contexts/CurrentBoardContext";
import { TaskProps } from "../../types";
import AddColumnTab from "../Column/AddColumnTab/AddColumnTab";
import AddTask from "./AddTask/AddTask";
import TaskItem from "./TaskItem/TaskItem";

const Task = ({ currentTab, data, addColumn }: TaskProps) => {
  const [taskObj, setTaskObj] = useState<any>({});

  const [colorList, setColorList] = useState([]);

  const currentTabId = useContext(CurrentBoardContext)

  const headerColors = ["#8471F2", "#67E2AE","#49C4E5"]

  function getColor(column: any, index: number) {
    const colorIndex = index % headerColors.length;
    console.log('color index')
    console.log(colorIndex)
    return headerColors[colorIndex];
  }

  function assignColors() {
    const currentBoard = data.find((item: any) => item.id == currentTabId)
    const newColorList = currentBoard.columns?.map((item: any, index: number) => {
      console.log('yes')
      return getColor(item, index);
    });
    setColorList(newColorList);
  }

  
  useEffect(() => {
    assignColors()
    console.log('color list')
    console.log(colorList)
  }, [currentTab, data])

  useEffect(() => {
    setTaskObj(data.find((item: any) => item.id == currentTabId));
  }, [currentTabId,data]);

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
            columnId={item.id}
            color={colorList ? colorList[i]: []}
          />
        ))}
        <AddColumnTab addColumn={addColumn} />
      </div>
    </>
  );
};

export default Task;
