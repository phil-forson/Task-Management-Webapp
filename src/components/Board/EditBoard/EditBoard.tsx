import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AllBoardsContext } from "../../../contexts/AllBoardsContext";
import { BoardContext } from "../../../contexts/BoardContext";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { CurrentBoardContext } from "../../../contexts/CurrentBoardContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
import Subfield from "../../Subfield/Subfield";

export type EditBoardProps = {
  closeModal: () => void;
  currentTab: string;
  addColumn?: boolean;
};

const EditBoard = ({
  closeModal,
  currentTab,
  addColumn = false,
}: EditBoardProps) => {
  const columnsList = useContext(ColumnsContext);

  const currentTabId = useContext(CurrentBoardContext);

  const { data, setData } = useContext(AllBoardsContext);

  useEffect(() => {
    console.log("data from use effect");
    console.log(data);
    if (addColumn) {
      const newField = { column: "" };
      setInputFields({
        ...inputFields,
        columns: [...inputFields.columns, newField],
      });
    }
  }, []);

  const [inputFields, setInputFields] = useState({
    name: currentTab,
    columns: columnsList.map((column: any) => {
      return {
        column: column,
      };
    }),
  });

  const [emptyColumnIds, setEmptyColumnIds] = useState<Array<number>>([]);

  const [nameError, setNameError] = useState<boolean>(false);
  const [columnError, setColumnError] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let data: any = { ...inputFields };
    data["name"] = e.target.value;
    setInputFields(data);
  };

  const handleSubfieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let data: any = [...inputFields.columns];
    data[index][e.target.name] = e.target.value;
    console.log(data);
    setInputFields({ ...inputFields, columns: data });
  };

  const deleteSubfield = (index: number) => {
    let data: any = [...inputFields.columns];
    data.splice(index, 1);
    setInputFields({ ...inputFields, columns: data });
  };

  const addSubfield = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newField = { column: "" };
    setInputFields({
      ...inputFields,
      columns: [...inputFields.columns, newField],
    });
  };

  const editBoard = (reqObj: any) => {
    const backendUrl =
      import.meta.env.VITE_REACT_APP_BASE_URL + "/" + currentTabId;
    console.log(backendUrl);
    axios.patch(backendUrl, reqObj).then((res) => {
      if (res.status === 200) {
        // closeModal();
        console.log("data");
        console.log(data);
        const newArr = data.map((board: any) =>
          board.id === currentTabId ? { ...board, ...reqObj } : board
        );
        console.log("newArr");
        console.log(newArr);
        setData(newArr);
      }
    });
  };

  const saveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const unfilledColumns = inputFields.columns.filter(
      (column: any) => column.column === ""
    );

    for (let i = 0; i < inputFields.columns.length; i++) {
      if (inputFields.columns[i].column == "") {
        setEmptyColumnIds((prevIds) => [...prevIds, i]);
      }
    }

    if (!inputFields.name && unfilledColumns.length !== 0) {
      console.log("input unfilled");
      setNameError(true);
      setColumnError(true);
      console.log(unfilledColumns.length !== 0);
    } else if (!inputFields.name) {
      setNameError(true);
      setColumnError(false);
      console.log(unfilledColumns.length !== 0);
      console.log("title error");
    } else if (unfilledColumns.length !== 0) {
      console.log(unfilledColumns);
      setColumnError(true);
      setNameError(false);
      console.log(unfilledColumns.length !== 0);
      console.log("only Column error");
    } else {
      setNameError(false);
      setColumnError(false);

      const request = {
        name: inputFields.name,
        columns: inputFields.columns.map((columnArr: any, index: number) => {
          return { id: index + 1, name: columnArr.column, tasks: [] };
        }),
      };
      console.log(request);
      editBoard(request);
    }
  };

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(inputFields);
  }, []);

  return (
    <form className="px-7 py-5 bg-white dark:bg-darkGrey tablet:w-[480px] mobile:w-[343px] h-[auto] rounded-[6px] dark:text-white">
      <div className="font-jakartaBold">Edit Board</div>
      <div className="mt-3 flex flex-col">
        <label
          htmlFor="name"
          className={
            "font-jakartaBold text-mediumGrey text-[12px] w-full " +
            (nameError && "text-mainRed")
          }
        >
          Board Name<sup className="text-mainRed">*</sup>
        </label>
        <div className="relative">
          <input
            className={
              "h-[40px] w-full border-[1px] bg-transparent rounded-[2px] border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] outline-none " +
              (nameError ? "border-mainRed" : "border-[rgba(130,143,163,.25)] ")
            }
            placeholder="e.g. Web Design"
            name="name"
            value={inputFields.name}
            onChange={(e) => handleFormChange(e)}
          />
          {nameError && (
            <div className="text-mainRed text-[13px] absolute bottom-0 title-error font-jakartaSemi">
              Can't be empty
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <label
          className={
            "font-jakartaBold text-mediumGrey text-[12px] w-full " +
            (columnError && "text-mainRed")
          }
        >
          Board Columns<sup className="text-mainRed">*</sup>
        </label>
        <div className="relative">
          {inputFields.columns.map((item: any, index: number) => (
            <Subfield
              index={index}
              key={index}
              input={item.column}
              deleteSubfield={deleteSubfield}
              handleSubfieldChange={handleSubfieldChange}
              placeholder="eg. Todo"
              name="column"
              emptySubfieldIds={emptyColumnIds}
            />
          ))}
          {columnError && (
            <div className="text-mainRed text-[13px] float-right mb-3 font-jakartaBold">
              Please fill empty column field
              {emptyColumnIds.length > 1 && <span>s</span>}
            </div>
          )}
        </div>
        <div className="h-[40px] mt-2">
          <Button
            onClick={(e) => addSubfield(e)}
            text="Add New Column"
            color="mainPurple"
            primary={theme === "light" ? "#635FC71A" : "white"}
            hoverColor={theme === "light" ? "lightPurpleHover" : "white"}
          />
        </div>
      </div>
      <div className="mt-5 h-[40px]">
        <Button
          text="Save Changes"
          icon={false}
          onClick={(e) => saveChanges(e)}
        />
      </div>
    </form>
  );
};

export default EditBoard;
