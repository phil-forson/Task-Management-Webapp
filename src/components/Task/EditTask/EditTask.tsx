import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AllBoardsContext } from "../../../contexts/AllBoardsContext";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { CurrentBoardContext } from "../../../contexts/CurrentBoardContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { IAddTask } from "../../../types";
import Button from "../../Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import Subfield from "../../Subfield/Subfield";

export type EditTaskProps = {
  task: any;
  handleCloseModal: () => void;
  columnId: number;
};

const EditTask = ({ task, handleCloseModal, columnId }: EditTaskProps) => {
  const { columnListAndIds } = useContext(ColumnsContext);
  useEffect(() => {
    console.log(inputFields);
  }, []);
  const [inputFields, setInputFields] = useState<IAddTask>({
    title: task.title,
    description: task.description,
    subtasks: task.subtasks.map((subtask: any) => {
      return {
        id: subtask.id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      };
    }),
    status: task.status,
  });
  const [subtaskId, setSubtaskId] = useState(
    task.subtasks[task.subtasks.length - 1].id
  );

  useEffect(() => {
    console.log(
      task.subtasks.map((subtask: any) => {
        return {
          id: subtask.id,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        };
      })
    );
  }, []);

  const [emptySubtaskIds, setEmptySubtaskIds] = useState<Array<number>>([]);

  const [currentColumnId, setCurrentColumnId] = useState(columnId);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [subtaskError, setSubtaskError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false)

  const { data, setData } = useContext(AllBoardsContext);

  const currentTabId = useContext(CurrentBoardContext);

  const { columnsList } = useContext(ColumnsContext);

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
    console.log(data);
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

  const onSelectChange = (id: any, name: string) => {
    const data = { ...inputFields };
    setCurrentColumnId(id);
    data.status = name;
    console.log(data);
    setInputFields(data);
  };

  const AddSubtaskFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = inputFields.subtasks[inputFields.subtasks.length - 1].id
      ? inputFields.subtasks[inputFields.subtasks.length - 1].id + 1
      : 1;
    console.log(newId);

    let newField = { id: newId, title: "", isCompleted: false };
    setInputFields({
      ...inputFields,
      subtasks: [...inputFields.subtasks, newField],
    });
  };

  const saveEditTask = (reqObj: any) => {
    setIsLoading(true)
    const backendUrl =
      import.meta.env.VITE_REACT_APP_BASE_URL + "/" + currentTabId;
    axios.patch(backendUrl, reqObj).then((res) => {
      setIsLoading(false)
      if (res.status === 200) {
        console.log(res);
        const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, ...reqObj } : { ...board }
        );
        setData(newArr);
        handleCloseModal();
      }
    });
  };

  const editTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const unfilledSubtasks = inputFields.subtasks.filter(
      (subtask: any) => subtask.title === ""
    );

    for (let i = 0; i < inputFields.subtasks.length; i++) {
      if (inputFields.subtasks[i].title == "") {
        setEmptySubtaskIds((prevIds) => [...prevIds, i]);
      }
    }

    console.log(unfilledSubtasks);
    console.log(inputFields.subtasks);
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
      // handleCloseModal();
      const boardToPatch = data.find((board: any) => board.id === currentTabId);

      boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.find((item: any) => item.id === task.id).title =
        inputFields.title;
      boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.find((item: any) => item.id === task.id).description =
        inputFields.description;
      boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.find((item: any) => item.id === task.id).status =
        inputFields.status;
      boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.find((item: any) => item.id === task.id).subtasks =
        inputFields.subtasks.map((subtask: any) => {
          return {
            id: subtask.id,
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          };
        });
      boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.find((item: any) => item.id === task.id).status =
        inputFields.status;

      const currentCol = boardToPatch.columns.find(
        (column: any) => column.id === columnId
      );

      const legitTasks = boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.filter((item: any) => item.status === currentCol.name);
        console.log('legit tasks')
        console.log(legitTasks)

      const changedTaskStatus = boardToPatch.columns
        .find((column: any) => column.id === columnId)
        .tasks.filter((item: any) => item.status !== currentCol.name);
        console.log('changed task status')
        console.log(changedTaskStatus)

      changedTaskStatus.map((item: any) => {
        const columnToUpdate = boardToPatch.columns.find(
          (column: any) => column.name === item.status
        );
        if (columnToUpdate) {
          const newId =
            boardToPatch.columns.find(
              (column: any) => column.name === item.status
            ).tasks.length > 0
              ? boardToPatch.columns.find(
                  (column: any) => column.name === item.status
                ).tasks[
                  boardToPatch.columns.find(
                    (column: any) => column.name === item.status
                  ).tasks.length - 1
                ].id + 1
              : 1;
          item.id = newId;
          boardToPatch.columns.find(
            (column: any) => column.name === item.status
          ).tasks = [
            ...boardToPatch.columns.find(
              (column: any) => column.name === item.status
            ).tasks,
            item,
          ];
        }
      });
      boardToPatch.columns.find((column: any) => column.id === columnId).tasks =
        [...legitTasks];

        console.log(boardToPatch)
      saveEditTask(boardToPatch)
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="px-7 py-5 bg-white tablet:w-[480px] mobile:w-[343px] h-[auto] rounded-[6px] dark:bg-darkGrey dark:text-white">
      <form>
        <div className="font-jakartaBold">Edit Task</div>
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
                "h-[40px] border-[1px] w-full rounded-[2px] bg-transparent border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] outline-none " +
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
            {inputFields.subtasks.map((item: any, index: number) => (
              <Subfield
                index={index}
                input={item.title}
                deleteSubfield={deleteSubtaskField}
                handleSubfieldChange={(e) => handleSubtaskChange(index, e)}
                name="title"
                key={index}
                emptySubfieldIds={emptySubtaskIds}
                placeholder={"eg. Code"}
              />
            ))}
            {subtaskError && (
              <div className="text-mainRed text-[13px] float-right mb-3 font-jakartaBold">
                Please fill empty subtask field(s)
              </div>
            )}
          </div>
          <div className="h-[40px]">
            <Button
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
            className="font-jakartaBold text-mediumGrey text-[12px]"
          >
            Status<sup className="text-mainRed">*</sup>
          </label>
          <Dropdown
            value={inputFields.status}
            dropdownListObject={columnListAndIds}
            onSelectChange={onSelectChange}
          />
        </div>

        <div className="h-[40px] mt-5">
          <Button
            text="Edit Task"
            icon={false}
            onClick={(e) => editTask(e)}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
