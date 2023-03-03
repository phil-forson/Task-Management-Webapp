import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AllBoardsContext } from "../../../contexts/AllBoardsContext";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { CurrentBoardContext } from "../../../contexts/CurrentBoardContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
import Checkbox from "../../Checkbox/Checkbox";
import Dropdown from "../../Dropdown/Dropdown";
import Submenu from "../../Submenu/Submenu";
import "./TaskDetails.css";

const TaskDetails = ({
  task,
  taskTitle,
  completed,
  status,
  totalNumOfSubtasks,
  description,
  subtasks,
  closeModal,
  openEditModal,
  openDeleteModal,
  columnId,
}: any) => {
  const { columnListAndIds } = useContext(ColumnsContext);
  const { data, setData } = useContext(AllBoardsContext);
  const currentTabId = useContext(CurrentBoardContext);

  const [inputFields, setInputFields] = useState({
    subtasks: subtasks.map((task: any) => {
      return {
        title: task.title,
        isCompleted: task.isCompleted,
        id: task.id,
      };
    }),
    status: status,
  });
  const [currentColumnId, setCurrentColumnId] = useState(columnId);

  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const previousColumnId = useRef(null);

  const openSubmenu = () => setSubmenuOpen(true);

  const closeSubmenu = () => setSubmenuOpen(false);

  const { columnsList } = useContext(ColumnsContext);

  useEffect(() => {
    previousColumnId.current = currentColumnId;
  }, [currentColumnId]);
  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = { ...inputFields };
    data.subtasks[index].isCompleted = e.target.checked;
    setInputFields(data);
  };

  const onSelectChange = (id: any, name: string) => {
    const data = { ...inputFields };
    setCurrentColumnId(id);
    data.status = name;
    console.log(data);
    setInputFields(data);
  };

  const updateBoard = (reqObj: any) => {
    setIsLoading(true)
    const backendUrl =
      import.meta.env.VITE_REACT_APP_BASE_URL + "/" + currentTabId;
    axios.patch(backendUrl, reqObj).then((res) => {
      setIsLoading(false)
      if (res.status === 200) {
        const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, ...reqObj } : { ...board }
        );
        setData(newArr);
        closeModal();
      }
    });
  };

  const saveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    const boardToPatch = data.find((board: any) => board.id === currentTabId);

    boardToPatch.columns
      .find((column: any) => column.id === columnId)
      .tasks.find((item: any) => item.id === task.id).subtasks = [
      ...inputFields.subtasks,
    ];
    boardToPatch.columns
      .find((column: any) => column.id === columnId)
      .tasks.find((item: any) => item.id === task.id).status =
      inputFields.status;

    const currentColumn = boardToPatch.columns.find(
      (column: any) => column.id === columnId
    );

    const legitTasks = boardToPatch.columns
      .find((column: any) => column.id === columnId)
      .tasks.filter((item: any) => item.status === currentColumn.name);

    const changedTaskStatus = boardToPatch.columns
      .find((column: any) => column.id === columnId)
      .tasks.filter((item: any) => item.status !== currentColumn.name);

    changedTaskStatus.map((item: any) => {
      const columnToUpdate = boardToPatch.columns.find(
        (column: any) => column.name === item.status
      );
      console.log(
        boardToPatch.columns.find((column: any) => column.name === item.status)
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
    boardToPatch.columns.find((column: any) => column.id === columnId).tasks = [
      ...legitTasks,
    ];


    const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, ...boardToPatch } : { ...board }
        );
        setData(newArr);


    console.log(boardToPatch);
   
    updateBoard(boardToPatch);
  };

  const editTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("opeening editttt");
    e.preventDefault();
    openEditModal();
    closeModal();
  };

  const onEditTask = (task: any) => {
    openEditModal();
    closeModal();
  };

  const onDeleteTask = () => {
    openDeleteModal();
    closeModal();
    console.log("deleting task");
  };

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(inputFields);
  }, []);

  return (
    <>
      <div className="px-7 py-5 bg-white tablet:w-[480px] mobile:w-[343px] h-[auto] dark:bg-darkGrey dark:text-white">
        <div className="flex w-full items-center justify-between">
          <div className="font-jakartaBold">{taskTitle}</div>
          <div className="ml-5 pl-1 relative" onMouseEnter={openSubmenu}>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
            {submenuOpen && (
              <Submenu
                submenu={[
                  { text: "Edit", onClick: onEditTask },
                  { text: "Delete", onClick: onDeleteTask },
                ]}
                onMouseEnter={openSubmenu}
                onMouseLeave={closeSubmenu}
              />
            )}
          </div>
        </div>
        {description && (
          <div className="mt-5 font-jakartaLight text-mediumGrey mobile:text-[13px]">
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
          {/* <div className="w-full mt-3">
            <select
              className="w-full border-[mediumGrey] outline-none font-jakartaSemi text-[13px] border-[1px] h-[40px] px-2 bg-white dark:bg-darkGrey dark:border-tintedMediumGrey"
              value={inputFields.status}
              onChange={(e) => onSelectChange(e)}
            >
              {columnsList.map((column: any) => (
                <option className="border-none" value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div> */}
          {/* <Select dropdownItems={columnsList} onOptionChange={(e) => onSelectChange(e)} value={inputFields.status} />
           */}
          <div className="w-full mt-3 text-[13px] ">
            <Dropdown
              value={inputFields.status}
              dropdownListObject={columnListAndIds}
              onSelectChange={onSelectChange}
            />
          </div>
        </div>
        <div className="h-[40px] mt-5">
          <Button
            text="Save Changes"
            icon={false}
            onClick={(e) => saveChanges(e)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
