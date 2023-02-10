import React, { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
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

  const createBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(inputFields)
    closeModal()
  }

  const { theme } = useContext(ThemeContext)

  return (
    <form className="px-7 py-5 bg-white dark:bg-darkGrey dark:text-white w-[480px] h-[auto] rounded-[6px] overflow-auto">
      <div className="font-jakartaBold">Add New Board</div>
      <div className="mt-3 flex flex-col">
        <label
          htmlFor="name"
          className="font-jakartaBold text-mediumGrey text-[12px]"
        >
          Name
        </label>
        <input
          className="h-[40px] border-[1px] bg-transparent rounded-[2px] border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] outline-none "
          placeholder="e.g. Web Design"
          name="name"
          value={inputFields.name}
          onChange={(e) => handleFormChange(e)}
        />
      </div>
      <div className="mt-3 flex flex-col">
        <label className="font-jakartaBold text-mediumGrey text-[12px]">
          Columns
        </label>
        {inputFields.columns.map((item: any, index) => (
          <Subfield
            index={index}
            input={item.column}
            deleteSubfield={deleteSubfield}
            handleSubfieldChange={handleSubfieldChange}
            placeholder="eg. Todo"
            name="column"
          />
        ))}
        <div className="h-[40px]">
          <Button
            onClick={(e) => addSubfield(e)}
            text="Add New Column"
            color="mainPurple"
            primary={theme === 'light' ? "[#635FC71A]": 'white'}
          />
        </div>
      </div>
      <div className="mt-5 h-[40px]">
        <Button 
        text="Create New Board"
        onClick={(e) => createBoard(e)}
         />
      </div>
    </form>
  );
};

export default AddNewBoard;
