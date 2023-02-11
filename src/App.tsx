import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColumnsContext } from "./contexts/ColumnsContext";
import { ThemeContext } from "./contexts/ThemeContext";
import data from "./data.json";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [columnList, setColumnList] = useState<Array<any>>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [boardModalOpen, setBoardModalOpen] = useState(false)

  const openBoardModal = () => {
    setBoardModalOpen(true);
  };

  const closeBoardModal = () => {
    setBoardModalOpen(false);
  };

  const findBoard = () => {
    const board = data.boards.find((board: any) => board.name == currentTab);
    return board;
  };

  const findColumns = () => {
    const board = findBoard();
    const arr: Array<any> = [];
    board?.columns.map((column) => {
      arr.push(column.name);
    });
    setColumnList(arr);
  };
  useEffect(() => {
    if (data.boards) {
      setCurrentTab(data.boards[0].name);
    } else {
      setCurrentTab("No Boards Created");
    }
  }, []);

  useEffect(() => {
    findColumns();
    console.log("finding columns...");
    console.log(columnList);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem("theme", theme || "light");
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeElements = { theme, setTheme };

  return (
    <ColumnsContext.Provider value={columnList}>
      <ThemeContext.Provider value={themeElements}>
        <div className=" dark:bg-darkGrey">
          <Nav
            currentTab={currentTab}
            openModal={open}
            showSidebar={showSidebar}
            setCurrentTab={setCurrentTab}
            data={data}
            openBoardModal={openBoardModal}
            closeBoardModal={closeBoardModal}
          />
          <div className="flex">
            {showSidebar && (
              <Sidebar
                setShowSidebar={setShowSidebar}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                boardModalOpen={boardModalOpen}
                openBoardModal={openBoardModal}
                closeBoardModal={closeBoardModal}
              />
            )}
            <Board
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              currentTab={currentTab}
              data={data}
              columnsList={columnList}
            />
          </div>
          {/* {modalOpen && <Modal handleClose={close} text="Hello world" />} */}
        </div>
      </ThemeContext.Provider>
    </ColumnsContext.Provider>
  );
}

export default App;
