import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColumnsContext } from "./contexts/ColumnsContext";
import { ThemeContext } from "./contexts/ThemeContext";
import axios from "axios";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentTabId, setCurrentTabId] = useState<number>();
  const [currentTab, setCurrentTab] = useState<string>("");
  const [columnList, setColumnList] = useState<Array<any>>([]);
  const [boardsList, setBoardsList] = useState<Array<any>>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);

  const openBoardModal = () => {
    setBoardModalOpen(true);
  };

  const closeBoardModal = () => {
    setBoardModalOpen(false);
  };

  const findBoard = () => {
    const board = data?.find((board: any) => board.name == currentTab);
    return board;
  };

  const findColumns = () => {
    const board = findBoard();
    const arr: Array<any> = [];
    board?.columns.map((column: any) => {
      arr.push(column.name);
    });
    setColumnList(arr);
  };

  const getBoards = () => {
    axios.get("http://localhost:3000/boards").then((res) => {
      if (res.status == 200) {
        setData(res.data);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    console.log(data);
    console.log("data");
  }, [data]);

  useEffect(() => {
    getBoards();
    console.log(data);
    setCurrentTabId(data[0]?.id);
    if (data.length > 0) {
      const currentBoard = data.find((board: any) => board.id === currentTabId);
      setCurrentTab(currentBoard?.name);
      console.log(currentTab);
      console.log("current tab");
      for (let i = 0; i < data.length; i++) {
        setBoardsList((prevBoards) => [...prevBoards, data[i].name]);
      }
      console.log(currentTab);
    } else {
      console.log("no boards");
      setCurrentTab("No Boards Created");
    }
    if (!!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    console.log("get theme");
    console.log(data.length > 0);
  }, []);

  useEffect(() => {
    findColumns();
    console.log("finding columns...");
    console.log(columnList);
  }, [currentTab]);

  useEffect(() => {
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
