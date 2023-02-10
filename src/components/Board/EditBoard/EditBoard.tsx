import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../../contexts/BoardContext";
import { ColumnsContext } from "../../../contexts/ColumnsContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
import Subfield from "../../Subfield/Subfield";

const EditBoard = ({ closeModal }: any) => {
  const currentTab = useContext(BoardContext);

  const columnsList = useContext(ColumnsContext);

  const [inputFields, setInputFields] = useState({
    name: currentTab,
    columns: columnsList.map((column: any) => {
      return {
        column: column,
      };
    }),
  });

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

  const saveChanges = () => {
    console.log(inputFields);
    closeModal();
  };

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(inputFields);
  }, []);

  return (
    <form className="px-7 py-5 bg-white dark:bg-darkGrey w-[480px] h-[auto] rounded-[6px] dark:text-white">
      <div className="font-jakartaBold">Edit Board</div>
      <div className="mt-3 flex flex-col">
        <label
          htmlFor="name"
          className="font-jakartaBold text-mediumGrey text-[12px] w-full"
        >
          Board Name
        </label>
        <input
          className="h-[40px] border-[1px] rounded-[2px] border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] bg-transparent outline-none "
          placeholder="e.g. Web Design"
          name="name"
          value={inputFields.name}
          onChange={(e) => handleFormChange(e)}
        />
      </div>
      <div className="mt-3 flex flex-col">
        <label className="font-jakartaBold text-mediumGrey text-[12px] w-full">
          Board Columns
        </label>
        {inputFields.columns.map((item: any, index: any) => (
          <Subfield
            index={index}
            input={item.column}
            deleteSubfield={deleteSubfield}
            handleSubfieldChange={handleSubfieldChange}
            key={index}
            name="column"
          />
        ))}
        <div className="h-[40px] mt-2">
          <Button
            onClick={(e) => addSubfield(e)}
            text="Add New Column"
            color="mainPurple"
            primary={theme === "light" ? "lightPurple" : "white"}
          />
        </div>
      </div>
      <div className="mt-5 h-[40px]">
        <Button text="Save Changes" icon={false} onClick={saveChanges} />
      </div>
    </form>
  );
};

export default EditBoard;
