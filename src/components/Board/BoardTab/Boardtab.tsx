import React, { useContext, useEffect } from 'react'
import { CurrentBoardContext } from '../../../contexts/CurrentBoardContext'
import { BoardtabProps } from '../../../types'

const Boardtab = ({name, currentTab, setCurrentTabId, id, sliceString}: BoardtabProps) => {

    const handleActive = () => {
        setCurrentTabId(id)
    }

    const currentTabId  = useContext(CurrentBoardContext)


  return (
    <div className={'h-[48px] cursor-pointer text-mediumGrey ' + (id == currentTabId ? "bg-mainPurple rounded-r-[100px] " : "")}  onClick={handleActive} >
    <div className="flex ml-8 items-center h-full">
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
          className={id === currentTabId ? "fill-white" : "fill-mediumGrey"}
        />
      </svg>
      <div className={"ml-5 " + (id == currentTabId ? "text-white" : "")}>{sliceString ? name.length < 15 ? name : name.slice(0,14)+ '...': name}</div>
    </div>
  </div>
  )
}

export default Boardtab