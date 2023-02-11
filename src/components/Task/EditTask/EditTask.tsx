import React, { useContext, useEffect, useState } from "react";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { IAddTask } from "../../../types";
import Button from "../../Button/Button";
import Subfield from "../../Subfield/Subfield";

export type EditTaskProps = {
  task: any;
  handleCloseModal: () => void;
};

const EditTask = ({
  task,
  handleCloseModal,
}: EditTaskProps) => {
  useEffect(() => {
    console.log(inputFields);

  }, []);
  const [inputFields, setInputFields] = useState<IAddTask>({
    title: task.title,
    description: task.description,
    subtasks: task.subtasks,
    status: task.status,
  });

  const columnsList = useContext(ColumnsContext);

  const deleteSubtaskField = (index: any) => {
    let data = [...inputFields.subtasks];
    data.splice(index, 1);
    setInputFields({ ...inputFields, subtasks: data });
  };

  const handleSubtaskChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data: Array<any> = [...inputFields.subtasks];
    data[index][e.target.name] = e.target.value;
    setInputFields({ ...inputFields, subtasks: data });
  };

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let data: any = { ...inputFields };
    data[e.target.name] = e.target.value;
    setInputFields(data);
  };

  const AddSubtaskFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newField = { title: "" };
    setInputFields({
      ...inputFields,
      subtasks: [...inputFields.subtasks, newField],
    });
  };

  const editTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(inputFields);
    handleCloseModal();
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="px-7 py-5 bg-white tablet:w-[480px] mobile:w-[343px] h-[auto] rounded-[6px] dark:bg-darkGrey dark:text-white">
      <form>
        <div className="font-jakartaBold">Edit Task</div>
        <div className="mt-3 flex flex-col">
          <label
            htmlFor="title"
            className="font-jakartaBold text-mediumGrey text-[12px]"
          >
            Title
          </label>
          <input
            className="h-[40px] border-[1px] rounded-[2px] bg-transparent border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] outline-none "
            placeholder="e.g. Take coffee break"
            name="title"
            value={inputFields.title}
            onChange={(e) => handleFormChange(e)}
          />
        </div>

        <div className="mt-3 flex flex-col">
          <label
            htmlFor="description"
            className="font-jakartaBold text-mediumGrey text-[12px]"
          >
            Description
          </label>
          <textarea
            className="h-[135px] border-[1px] rounded-[2px] bg-transparent border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 py-3 text-[13px] outline-none resize-none"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            name="description"
            value={inputFields.description}
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label
            htmlFor="subtasks"
            className="font-jakartaBold text-mediumGrey text-[12px]"
          >
            Subtasks
          </label>
          {inputFields.subtasks.map((item: any, index: number) => (
            <Subfield
              index={index}
              input={item.title}
              deleteSubfield={deleteSubtaskField}
              handleSubfieldChange={(e) => handleSubtaskChange(index, e)}
              name="title"
              key={index}
            />
          ))}
          <div className="h-[40px]">
            <Button
              onClick={(e) => AddSubtaskFields(e)}
              text="Add New Subtask"
              color="mainPurple"
              primary={theme === "light" ? "#635FC71A" : 'white'}
              hoverColor={theme ==="light" ? "lightPurpleHover": "white"}
              icon={true}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col">
          <label
            htmlFor="status"
            className="font-jakartaBold text-mediumGrey text-[12px]"
          >
            Status
          </label>
          <select
            className="w-full border-[mediumGrey] outline-none dark:bg-darkGrey dark:border-tintedMediumGrey dark:text-white font-jakartaSemi text-[14px] border-[1px] h-[40px] px-2"
            name="status"
            value={inputFields.status}
            onChange={(e) => handleFormChange(e)}
          >
            {columnsList.map((column: any) => (
              <option className="border-none" value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        <div className="h-[40px] mt-5">
          <Button
            text="Edit Task"
            icon={false}
            onClick={(e) => editTask(e)}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
