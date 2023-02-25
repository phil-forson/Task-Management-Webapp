import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AllBoardsContext } from "../../../contexts/AllBoardsContext";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { CurrentBoardContext } from "../../../contexts/CurrentBoardContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AddTaskProps, IAddTask } from "../../../types";
import Button from "../../Button/Button";
import LightPurpleButton from "../../Button/LightPurpleButton/LightPurpleButton";
import Dropdown from "../../Dropdown/Dropdown";
import Subfield from "../../Subfield/Subfield";
import "./AddTask.css";

const AddTask = ({ handleCloseModal }: AddTaskProps) => {
  const { columnsList, columnListAndIds } = useContext(ColumnsContext);
  const [inputFields, setInputFields] = useState<IAddTask>({
    title: "",
    description: "",
    subtasks: [
      {
        title: "",
      },
    ],
    status: columnListAndIds[0].name,
  });
  const [emptySubtaskIds, setEmptySubtaskIds] = useState<Array<number>>([]);
  const [currentColumnId, setCurrentColumnId] = useState(
    columnListAndIds[0].id
  );

  const { data, setData } = useContext(AllBoardsContext);

  const currentTabId = useContext(CurrentBoardContext);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [subtaskError, setSubtaskError] = useState<boolean>(false);

  const deleteSubtaskField = (index: any) => {
    if (index !== 0) {
      let newData = [...inputFields.subtasks];
      newData.splice(index, 1);
      setInputFields({ ...inputFields, subtasks: newData });
    }
  };

  const handleSubtaskChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newData: Array<any> = [...inputFields.subtasks];
    newData[index][e.target.name] = e.target.value;
    setInputFields({ ...inputFields, subtasks: newData });
  };

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let newData: any = { ...inputFields };
    newData[e.target.name] = e.target.value;
    setInputFields(newData);
  };

  const onSelectChange = (id: any, name: string) => {
    let newData: any = { ...inputFields };
    setCurrentColumnId(id);
    newData.status = name;
    setInputFields(newData);
  };

  const AddSubtaskFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newField = { title: "" };
    setInputFields({
      ...inputFields,
      subtasks: [...inputFields.subtasks, newField],
    });
  };

  const addTaskToBoard = (reqObj: any) => {
    const backendUrl = import.meta.env.VITE_REACT_APP_BASE_URL + '/' + currentTabId
    axios.patch(backendUrl, reqObj).then((res) => {
      console.log(res)
      if(res.status === 200){
        const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, reqObj } : { ...board }
          );
        setData(newArr);
        handleCloseModal()
      }
    })
  }

  const createTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmptySubtaskIds([]);
    const unfilledSubtasks = inputFields.subtasks.filter(
      (subtask: any) => subtask.title === ""
    );

    for (let i = 0; i < inputFields.subtasks.length; i++) {
      if (inputFields.subtasks[i].title == "") {
        setEmptySubtaskIds((prevIds) => [...prevIds, i]);
      }
    }
    if (!inputFields.title && unfilledSubtasks.length !== 0) {
      console.log("input unfilled");
      setTitleError(true);
      setSubtaskError(true);
      console.log(unfilledSubtasks.length !== 0);
    } else if (!inputFields.title) {
      setTitleError(true);
      setSubtaskError(false);
      console.log(unfilledSubtasks.length !== 0);
      console.log("title error");
    } else if (unfilledSubtasks.length !== 0) {
      console.log(unfilledSubtasks);
      setSubtaskError(true);
      setTitleError(false);
      console.log(unfilledSubtasks.length !== 0);
      console.log("only subtask error");
    } else {
      setTitleError(false);
      setSubtaskError(false);
      console.log(inputFields);
      
      const boardToPatch = data.find((board: any) => board.id === currentTabId);
      const currentColumn = boardToPatch.columns.find(
        (column: any) => column.id === currentColumnId
      );

      //generate new id
      const newId =
      currentColumn.tasks.length > 0
          ? currentColumn.tasks[currentColumn.tasks.length - 1].id + 1
          : 1;
          // console.log(boardToPatch);

      //append task details to original task
      boardToPatch.columns.find(
        (column: any) => column.id === currentColumnId
        ).tasks = [
          ...boardToPatch.columns.find(
            (column: any) => column.id === currentColumnId
            ).tasks,
            { ...inputFields, id: newId, subtasks: [...inputFields.subtasks.map((subtask: any, index: number) => {
              return { id: index + 1, isCompleted: false, title: subtask.title}
            })] },
          ];

          console.log(boardToPatch)

          

      addTaskToBoard(boardToPatch)
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="px-7 py-5 bg-white tablet:w-[480px] mobile:w-[343px] h-[auto]  rounded-[6px] dark:bg-darkGrey dark:text-white">
      <form>
        <div className="font-jakartaBold">Add Task</div>
        <div className="mt-3 flex flex-col">
          <label
            htmlFor="title"
            className={
              "font-jakartaBold text-mediumGrey text-[12px] w-full " +
              (titleError && "text-mainRed")
            }
          >
            Title<sup className="text-mainRed">*</sup>
          </label>
          <div className="relative">
            <input
              className={
                "h-[40px] border-[1px] w-full rounded-[2px] bg-transparent font-jakartaSemi px-3 text-[13px] outline-none " +
                (titleError
                  ? "border-mainRed"
                  : "border-[rgba(130,143,163,.25)] ")
              }
              placeholder="e.g. Take coffee break"
              name="title"
              value={inputFields.title}
              onChange={(e) => handleFormChange(e)}
            />
            {titleError && (
              <div className="text-mainRed text-[13px] absolute bottom-0 title-error font-jakartaSemi">
                Can't be empty
              </div>
            )}
          </div>
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
            className={
              "font-jakartaBold text-mediumGrey text-[12px] w-full " +
              (subtaskError && "text-mainRed")
            }
          >
            Subtasks<sup className="text-mainRed">*</sup>
          </label>
          <div className="relative">
            {inputFields.subtasks.map((item: any, index) => (
              <Subfield
                index={index}
                input={item.title}
                deleteSubfield={deleteSubtaskField}
                handleSubfieldChange={(e) => handleSubtaskChange(index, e)}
                name="title"
                key={index}
                emptySubfieldIds={emptySubtaskIds}
              />
            ))}
            {subtaskError && (
              <div className="text-mainRed text-[13px] float-right mb-3 font-jakartaBold">
                Please fill empty subtask field
                {emptySubtaskIds.length > 1 && <span>s</span>}
              </div>
            )}
          </div>
          <div className="h-[40px]">
            <LightPurpleButton
              onClick={(e) => AddSubtaskFields(e)}
              text="Add New Subtask"
              color="mainPurple"
              primary={theme === "light" ? "#635FC71A" : "white"}
              hoverColor={theme === "light" ? "lightPurpleHover" : "white"}
              icon={true}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col text-[13px] ">
          <label
            htmlFor="status"
            className="font-jakartaBold text-mediumGrey text-[12px] w-full"
          >
            Status<sup className="text-mainRed">*</sup>
          </label>
          {/* <select
            className="w-full border-[mediumGrey] outline-none dark:bg-darkGrey dark:border-tintedMediumGrey dark:text-white font-jakartaSemiBold text-[14px] border-[1px] h-[40px] px-2 focus:border-mainPurple dark:focus:border-mainPurple"
            name="status"
            value={inputFields.status}
            onChange={(e) => handleFormChange(e)}
          >
            {columnsList.map((column: any) => (
              <option className="border-none" value={column}>
                {column}
              </option>
            ))}
          </select> */}
          <Dropdown
            value={inputFields.status}
            dropdownListObject={columnListAndIds}
            onSelectChange={onSelectChange}
          />
        </div>

        <div className="h-[40px] mt-5">
          <Button
            text="Create Task"
            icon={false}
            onClick={(e) => createTask(e)}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTask;
