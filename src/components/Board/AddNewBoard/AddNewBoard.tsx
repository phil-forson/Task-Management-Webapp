import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { BoardContext } from "../../../contexts/BoardContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
import LightPurpleButton from "../../Button/LightPurpleButton/LightPurpleButton";
import Subfield from "../../Subfield/Subfield";

const AddNewBoard = ({ closeModal }: any) => {
  const [inputFields, setInputFields] = useState({
    name: "",
    columns: [
      {
        column: "Todo",
      },
      {
        column: "Doing",
      },
    ],
  });

  const { data, setData } = useContext(BoardContext);

  const [emptyColumnIds, setEmptyColumnIds] = useState<Array<number>>([]);

  const [nameError, setNameError] = useState<boolean>(false);
  const [columnError, setColumnError] = useState<boolean>(false);

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

  const handleSubfieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let data: any = [...inputFields.columns];
    data[index][e.target.name] = e.target.value;
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

  const addBoard = (reqObj: any) => {
    const backendUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios.post(backendUrl, reqObj).then((res: any) => {
      console.log(res);
      if (res.status === 201) {
        closeModal();
        console.log(data);
        setData([...data, reqObj]);
      }
    });
  };

  const createBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
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

      console.log(inputFields);
      const request = {
        id: data[data.length - 1].id + 1,
        name: inputFields.name,
        columns: inputFields.columns.map((columnObj: any, index: number) => {
          return {
            id: index + 1,
            name: columnObj.column,
            tasks: [],
          };
        }),
      };

      console.log("id");
      console.log(data[data.length - 1].id + 1);

      console.log(request);
      addBoard(request);
    }
  };

  const { theme } = useContext(ThemeContext);

  return (
    <form className="px-7 py-5 bg-white dark:bg-darkGrey dark:text-white tablet:w-[480px] mobile:w-[343px] h-[auto] rounded-[6px] overflow-auto">
      <div className="font-jakartaBold">Add New Board</div>
      <div className="mt-3 flex flex-col">
        <label
          htmlFor="name"
          className={
            "font-jakartaBold text-mediumGrey text-[12px] w-full " +
            (nameError && "text-mainRed")
          }
        >
          Name<sup className="text-mainRed">*</sup>
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
          Columns<sup className="text-mainRed">*</sup>
        </label>
        <div className="relative">
          {inputFields.columns.map((item: any, index) => (
            <Subfield
              index={index}
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
        <div className="h-[40px]">
          <LightPurpleButton
            onClick={(e) => addSubfield(e)}
            text="Add New Column"
            color="mainPurple"
          />
        </div>
      </div>
      <div className="mt-5 h-[40px]">
        <Button text="Create New Board" onClick={(e) => createBoard(e)} />
      </div>
    </form>
  );
};

export default AddNewBoard;
