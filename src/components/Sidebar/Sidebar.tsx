import { SidebarProps } from "../../types";
import Switch from "../Switch/Switch";
import Boardtab from "../Board/BoardTab/Boardtab";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import AddNewBoard from "../Board/AddNewBoard/AddNewBoard";
import { ThemeContext } from "../../contexts/ThemeContext";

const Sidebar = ({
  setShowSidebar,
  currentTab,
  setCurrentTab,
  boardModalOpen,
  openBoardModal,
  closeBoardModal,
  data,
  setCurrentTabId,
  isLoadingBoards,
}: SidebarProps) => {
  const { theme,setTheme } = useContext(ThemeContext);
  
  const [darkMode, setDarkMode] = useState( theme === "dark"  );


  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <div className="relative laptop:w-[300px] laptop:min-w-[300px] tablet:min-w-[261px] tablet:max-w-[261px] max-h-full h-auto mobile:hidden tablet:block ">
        <div className="laptop:max-w-[300px] laptop:min-w-[300px] tablet:max-w-[261px] tablet:min-w-[261px] min-h-full fixed left-0 top-[85px] border-r-[1px] border-lightGrey dark:border-darkLines max-h-full overflow-scroll dark:bg-darkGrey text-mediumGrey z-10 bg-white">
          <div className="mr-5 pt-3 mb-12">
            <div className="font-jakartaBold uppercase text-[12px]  ml-8 tracking-widest h-[48px]">
              All boards ( {data.length} )
            </div>
            {isLoadingBoards ? (
              <div className="h-[300px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    margin: "auto",
                    background: "transparent",
                    display: "block",
                    shapeRendering: "auto",
                  }}
                  width="40px"
                  height="40px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  className=" fill-mainPurple "
                >
                  <path
                    d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                    stroke="#635FC7"
                    strokeWidth={5}
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="1s"
                      repeatCount="indefinite"
                      keyTimes="0;1"
                      values="0 50 51;360 50 51"
                    ></animateTransform>
                  </path>
                </svg>
              </div>
            ) : (
              data.map((item: any, index: number) => (
                <Boardtab
                  id={item.id}
                  name={item.name}
                  key={index}
                  currentTab={currentTab}
                  setCurrentTabId={setCurrentTabId}
                />
              ))
            )}
            <div className="h-[48px] mb-12">
              <div className="flex ml-8 items-center h-full">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    className="fill-mainPurple"
                  />
                </svg>
                <div
                  className="ml-5 text-mainPurple flex items-center cursor-pointer"
                  onClick={openBoardModal}
                >
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      className="fill-mainPurple"
                    />
                  </svg>
                  <div className="h-fit text-[15px] font-jakartaBold ml-2">
                    Create New Board
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-8 mb-5">
              <div className="h-[48px] bg-lightGrey dark:bg-veryDarkGrey">
                <div className="flex h-full items-center justify-evenly mx-10">
                  <svg
                    width="19"
                    height="19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                      fill="#828FA3"
                    />
                  </svg>
                  <Switch
                    onSwitchChange={handleSwitchChange}
                    darkMode={darkMode}
                  />
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                      fill="#828FA3"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="flex mt-4 items-center cursor-pointer pb-8"
                onClick={() => setShowSidebar(false)}
              >
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    className="fill-mediumGrey"
                  />
                </svg>
                <div className="ml-5">Hide Sidebar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {boardModalOpen && (
        <Modal
          handleClose={closeBoardModal}
          component={<AddNewBoard closeModal={closeBoardModal} setCurrentTabId={setCurrentTabId}/>}
        />
      )}
    </>
  );
};

export default Sidebar;
