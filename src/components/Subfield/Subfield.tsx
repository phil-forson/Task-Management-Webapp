import { useEffect } from "react";
import { SubfieldProps } from "../../types";

const Subfield = ({
  index,
  input,
  deleteSubfield,
  handleSubfieldChange,
  placeholder,
  name,
  emptySubfieldIds,
}: SubfieldProps) => {
  const isIndexInArray = (num: number, arr: Array<number>) => {
    return arr.includes(num);
  };
  const isEmpty = isIndexInArray(index, emptySubfieldIds);

  return (
    <div className="flex items-center justify-between mb-3 relative">
      <input
        className={
          "h-[40px] w-[94%] border-[1px] rounded-[2px] bg-transparent border-[rgba(130,143,163,.25)] font-jakartaSemi px-3 text-[13px] outline-none " +
          (isEmpty ? "border-mainRed " : " ")
        }
        placeholder={placeholder ? placeholder : "e.g. Take coffee break"}
        name={name}
        value={input}
        onChange={(e) => handleSubfieldChange(e, index)}
      />
      {isEmpty && (
        <div className="text-mainRed text-[13px] absolute bottom-0 right-1 title-error font-jakartaSemi">
          Can't be empty
        </div>
      )}
      <svg
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer ml-3"
        onClick={() => deleteSubfield(index)}
      >
        <g fill="#828FA3" fill-rule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
};

export default Subfield;
