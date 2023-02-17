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
  const [boardsList, setBoardsList] = useState<Array<any>>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [boardModalOpen, setBoardModalOpen] = useState(false);

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
      for (let i = 0; i < data.boards.length; i++) {
        setBoardsList((prevBoards) => [...prevBoards, data.boards[i].name]);
      }
      console.log(currentTab)
    } else {
      setCurrentTab("No Boards Created");
    }
    console.log('get theme')
    console.log(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, []);

  useEffect(() => {
    findColumns();
    console.log("finding columns...");
    console.log(columnList);
  }, [currentTab]);

  useEffect(() => {
    if (!!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme || "light");
    }
    if (localStorage.getItem("theme") == "dark"|| ( window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
            boardsList={boardsList}
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
