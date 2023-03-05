import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColumnsContext } from "./contexts/ColumnsContext";
import { ThemeContext } from "./contexts/ThemeContext";
import axios from "axios";
import { CurrentBoardContext } from "./contexts/CurrentBoardContext";
import { BoardContext } from "./contexts/BoardContext";
import { AllBoardsContext } from "./contexts/AllBoardsContext";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentTabId, setCurrentTabId] = useState<number>(0);
  const [columnsList, setColumnsList] = useState<Array<any>>([]);
  const [columnListAndIds, setColumnListAndIds] = useState<Array<any>>([]);
  const [boardsList, setBoardsList] = useState<Array<any>>([]);
  const [theme, setTheme] = useState("light");
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isLoadingBoards, setIsLoadingBoards] = useState(true);
  const [currentTab, setCurrentTab] = useState<string>("");

  const openBoardModal = () => {
    setBoardModalOpen(true);
  };

  const closeBoardModal = () => {
    setBoardModalOpen(false);
  };

  const findBoard = () => {
    const board = data?.find((board: any) => board.id == currentTabId);
    return board;
  };

  const findColumns = () => {
    const board = findBoard();
    const arr: Array<any> = [];
    const secArr: Array<any> = [];
    board?.columns.map((column: any) => {
      arr.push(column.name);
      secArr.push({ id: column.id, name: column.name });
    });
    setColumnsList(arr);
    setColumnListAndIds(secArr);
  };

  const getBoards = async () => {
    const backendUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    setIsLoadingBoards(true);
    await axios
      .get(backendUrl)
      .then((res) => {
        setIsLoadingBoards(false);
        if (res.status == 200) {
          setData(res.data);
          setCurrentTabId(res.data[0]?.id);
          console.log(currentTabId);
          if (res.data.length) {
            const currentBoard = res.data.find((board: any) => board.id === 1);
            setCurrentTab(currentBoard?.name);
            const boardObjList = [];
            for (let i = 0; i < res.data.length; i++) {
              const key = res.data[i]?.id;
              const value = res.data[i]?.name;
              const obj = { id: key, name: value };
              boardObjList.push(obj);
              setBoardsList(boardObjList);
            }
          }
        }
      })
      .catch((err) => {
        setIsLoadingBoards(false);
        console.error(err);
        alert("Something unexpected happened, try again later");
      });
  };

  useEffect(() => {
    const currentBoard = data.find((board: any) => board.id === currentTabId);
    setCurrentTab(currentBoard?.name);
    findColumns();
  }, [data]);

  useEffect(() => {
    const currentBoard = data.find((board: any) => board.id === currentTabId);
    setCurrentTab(currentBoard?.name);
    findColumns();
  }, [currentTabId]);

  useEffect(() => {
    const getData = async () => {
      await getBoards();
    };
    getData();
    console.log('here is data')
    console.log(data)
  }, []);

  useEffect(() => {
    console.log("current tab changing");
  }, [currentTab]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeElements = { theme, setTheme };

  return (
    <AllBoardsContext.Provider value={{ data, setData }}>
      <ColumnsContext.Provider value={{ columnsList, columnListAndIds }}>
        <ThemeContext.Provider value={themeElements}>
          <CurrentBoardContext.Provider value={currentTabId}>
            <div className=" dark:bg-darkGrey">
              <Nav
                currentTab={currentTab}
                openModal={open}
                showSidebar={showSidebar}
                setCurrentTabId={setCurrentTabId}
                data={data}
                openBoardModal={openBoardModal}
                closeBoardModal={closeBoardModal}
                boardsList={boardsList}
              />
              <div className="flex">
                {showSidebar && (
                  <Sidebar
                    data={data}
                    setShowSidebar={setShowSidebar}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    boardModalOpen={boardModalOpen}
                    openBoardModal={openBoardModal}
                    closeBoardModal={closeBoardModal}
                    setCurrentTabId={setCurrentTabId}
                    isLoadingBoards={isLoadingBoards}
                  />
                )}
                <Board
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                  currentTab={currentTab}
                  data={data}
                  columnsList={columnsList}
                  isLoadingBoards={isLoadingBoards}
                />
              </div>
            </div>
          </CurrentBoardContext.Provider>
        </ThemeContext.Provider>
      </ColumnsContext.Provider>
    </AllBoardsContext.Provider>
  );
}

export default App;
