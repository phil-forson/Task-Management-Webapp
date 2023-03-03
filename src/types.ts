import React, { ButtonHTMLAttributes } from "react";

export type AppProps = {};

export type NavProps = {
  currentTab: string;
  openModal: () => void;
  showSidebar: boolean;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  openBoardModal: () => void;
  closeBoardModal: () => void;
  boardsList: Array<any>
};

export type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  boardModalOpen: boolean;
  openBoardModal: () => void;
  closeBoardModal: () => void;
  data: any
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
};

export type BoardProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: string;
  data: any;
  columnsList: Array<any>;
};

export type ShowsidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | (() => void);
  color?: string;
  primary?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  hoverColor?: string;
  onlyIcon?: boolean;
  isLoading?: boolean
};

export type BoardtabProps = {
  name: string;
  currentTab: string;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
  id: number
};

export type TaskProps = {
  currentTab: string;
  data: any;
  addColumn: () => void;
};

export type TaskItemProps = {
  name: string;
  description: string;
  tasks: Array<{}>;
  subtasks: Object;
  tasksLength: number;
};

export type TaskCardProps = {
  status: any;
  task: any;
  taskTitle: string;
  completed: number;
  totalNumOfSubtasks: number;
  description: string;
  subtasks: Array<{}>;
  columnId: number
};

export type ModalProps = {
  handleClose: () => void;
  component: React.ReactNode;
};

export type BackdropProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export type AddTaskProps = {
  handleCloseModal: () => void;
};

export type SubfieldProps = {
  index: number;
  input: string;
  deleteSubfield: (index: number) => void;
  handleSubfieldChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  placeholder?: string;
  name: string;
  emptySubfieldIds: Array<number>
};

export type CheckboxProps = {
  element: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
};

export interface IAddTask {
  title: string;
  description: string;
  subtasks: Array<any>;
  status: string;
}

export interface IBoard {
  name: string;
  columns: Array<any>;
}
