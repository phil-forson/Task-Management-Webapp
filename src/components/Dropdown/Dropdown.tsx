import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Dropdown.css";

type DropdownProps = {
  value: any;
  dropdownList?: Array<any>;
  dropdownListObject?: Array<any>;
  onSelectChange: (id: any, name: string) => void;
  addBorder?: boolean;
  position?: string;
};

const Dropdown = ({
  value,
  dropdownList,
  onSelectChange,
  addBorder = true,
  position,
  dropdownListObject
}: DropdownProps) => {
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: any) => {
    setSelected(item.name);
    onSelectChange(item.id, item.name);
    setIsOpen(false);
  };

  const dropIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1
      }
    },
  };

  useEffect(() => {
    console.log("valuing");
    console.log(value);
  }, []);
  return (
    <div className="dropdown font-jakartaSemi ">
      <div
        className={
          "dropdown-btn cursor-pointer select-none " +
          (addBorder &&
            "bg-white border-[1px] dark:bg-darkGrey dark:border-tintedMediumGrey")
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{value}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={
            "dropdown-content border-[1px] dark:border-darkLines bg-white dark:bg-veryDarkGrey text-mediumGrey " +
            (position && position)
          }
        >
          {dropdownList && dropdownList.map((item: any, index: number) => (
            <div
              className={
                "dropdown-item cursor-pointer select-none hover:bg-lightPurpleHover "
              }
              onClick={() => handleSelect(item)}
              key={index}
            >
              {item}
            </div>
          ))}
          {dropdownListObject && dropdownListObject.map((item: any, index: number) => (
            <div
              className={
                "dropdown-item cursor-pointer select-none hover:bg-lightPurpleHover "
              }
              onClick={() => handleSelect(item)}
              key={index}
            >
              {item.name}
            </div>
          )) }
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
