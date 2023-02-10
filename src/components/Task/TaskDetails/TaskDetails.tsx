import { createContext, useContext, useEffect, useRef, useState } from "react";
import Ellipsis from "../../../assets/icon-vertical-ellipsis.svg";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import Button from "../../Button/Button";
import Checkbox from "../../Checkbox/Checkbox";
import "./TaskDetails.css";

const TaskDetails = ({
  task,
  completed,
  status,
  totalNumOfSubtasks,
  description,
  subtasks,
  closeModal
}: any) => {
  useEffect(() => {
    console.log(subtasks);
  }, []);

  const [inputFields, setInputFields] = useState({
    subtasks: subtasks.map((task: any) => {
      return {
        title: task.title,
        isCompleted: task.isCompleted,
      };
    }),
    status: status,
  });
 
  const columnsList = useContext(ColumnsContext);


  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = {...inputFields}
    data.subtasks[index].isCompleted = e.target.checked
    setInputFields(data)
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = {...inputFields}
    data.status = e.target.value
    setInputFields(data)
  }

  const saveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(inputFields)
    closeModal()
  }

  useEffect(() => {
    console.log(inputFields);
  }, []);

  return (
    <div className="px-7 py-5 bg-white w-[480px] h-[auto] dark:bg-darkGrey dark:text-white">
      <div className="flex w-full items-center justify-between">
        <div className="font-jakartaBold">{task}</div>
        <div className="ml-5">
          <img src={Ellipsis} className="h-[20px] w-[auto]" />
        </div>
      </div>
      {description && (
        <div className="mt-5 font-jakartaLight text-mediumGrey">
          {description}
        </div>
      )}
      <div className="mt-5">
        <div className="font-jakartaBold text-mediumGrey text-[14px]">
          Subtasks ({completed} of {totalNumOfSubtasks})
        </div>
        <div className="mt-3">
          {inputFields.subtasks.map((task: any, index: number) => (
            <Checkbox
              checked={task.isCompleted}
              element={task.title}
              index={index}
              onChange={(e) => onCheckboxChange(e, index)}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="font-jakartaBold text-mediumGrey text-[14px]">
          Current Status
        </div>
        <div className="w-full mt-3">
          <select
            className="w-full border-[mediumGrey] outline-none font-jakartaSemi text-[14px] border-[1px] h-[40px] px-2 bg-white dark:bg-darkGrey dark:border-tintedMediumGrey"
            value={inputFields.status}
            onChange={(e) => onSelectChange(e)}
          >
            {columnsList.map((column: any) => (
              <option className="border-none" value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-[40px] mt-5">
      <Button 
      text="Save Changes"
      icon={false}
      onClick={(e) => saveChanges(e)}
      />
      </div>
    </div>
  );
};

export default TaskDetails;
