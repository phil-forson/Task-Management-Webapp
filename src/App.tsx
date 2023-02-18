import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import { ColumnsContext } from "./contexts/ColumnsContext";
import { ThemeContext } from "./contexts/ThemeContext";
import axios from "axios";
import { CurrentBoardContext } from "./contexts/CurrentBoardContext";

function App() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentTabId, setCurrentTabId] = useState<number>(0);
  const [columnList, setColumnList] = useState<Array<any>>([]);
  const [boardsList, setBoardsList] = useState<Array<any>>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
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
    board?.columns.map((column: any) => {
      arr.push(column.name);
    });
    setColumnList(arr);
  };

  const getBoards = async () => {
    setIsLoadingBoards(true);
    await axios.get("http://localhost:3000/boards").then((res) => {
      setIsLoadingBoards(false);
      if (res.status == 200) {
        setData(res.data);
        setCurrentTabId(res.data[0]?.id);
        console.log(currentTabId);
        if (res.data.length) {
          const currentBoard = res.data.find((board: any) => board.id === 1);
          console.log(currentBoard);
          setCurrentTab(currentBoard.name);
          console.log("current tab");
          const boardObjList = []
          for (let i = 0; i < res.data.length; i++) {
            const key = res.data[i]?.id
            const value = res.data[i]?.name
            const obj = { id: key, name: value}
            boardObjList.push(obj)
            setBoardsList(boardObjList);
          }
          console.log('board obj list')
          console.log(boardObjList)
        }
      }
    });
  };

  useEffect(() => {
    console.log(data);
    console.log("data");
  }, [data]);

  useEffect(() => {
    console.log("tab id ", currentTabId);
    const currentBoard = data.find((board: any) => board.id === currentTabId);
    console.log("current board from use effect");
    console.log(currentBoard);
    setCurrentTab(currentBoard?.name);
    findColumns();
    console.log("finding columns...");
    console.log(columnList);
  }, [currentTabId]);

  useEffect(() => {
    console.log(data);
    if (!isLoadingBoards) {
      console.log("setting current tab id");
      console.log("there are boards");

      console.log(currentTab);
    }
    if (!!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }

    const getData = async () => {
      await getBoards();
    };
    getData();
    console.log("get theme");
    console.log(data.length > 0);
  }, []);

  useEffect(() => {
    console.log("current tab changing");
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
        </CurrentBoardContext.Provider>
      </ThemeContext.Provider>
    </ColumnsContext.Provider>
  );
}

export default App;
