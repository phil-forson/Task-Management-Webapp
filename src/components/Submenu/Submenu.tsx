import { motion } from "framer-motion";


export type SubmenuProps = {
  submenu: Array<any>;
  position?: string
  onMouseLeave?: any
  onMouseEnter?: any
};

const Submenu = ({ submenu, position, onMouseLeave, onMouseEnter }: SubmenuProps) => {

  const dropIn = {
    hidden: {
      rotateX: 20,
      opacity: 0,
    },
    visible: {
      rotateX: "0",
      opacity: 1,
      transition: {
        duration: 0.3,
        // type: "spring",
      },
    },
    exit: {
      rotateX: -20,
      opacity: 0,
      transition: {
        duration: 3,
        delay: 0.3
      }
    },
  };


  return (
    <motion.div
      className={"z-[20000] submenu top-[25px] block bg-white dark:bg-darkGrey text-mediumGrey dark:text-white font-jakartaSemi text-[12px] dark:border-darkLines border-[1px] " + (position ? position: ' absolute right-0')}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropIn}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <div>
        {submenu.map((menuItem: any) => (
          <div
            className="pl-2 pr-7 py-2 hover:bg-lightPurple"
            onClick={menuItem.onClick}
          >
            {menuItem.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Submenu;
