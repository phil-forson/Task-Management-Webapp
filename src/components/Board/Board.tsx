import React, { useEffect, useState } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { BoardProps } from '../../types'
import Modal from '../Modal/Modal'
import Task from '../Task/Task'
import EditBoard from './EditBoard/EditBoard'
import Emptyboard from './Emptyboard/Emptyboard'
import Showsidebar from './Showsidebar/Showsidebar'

const Board = ({ showSidebar, setShowSidebar, currentTab, data, columnsList }: BoardProps) => {

  const [openEditBoard, setOpenEditBoard] = useState(false)


  const open = () => setOpenEditBoard(true)

  const close = () => setOpenEditBoard(false)






  return (
    <BoardContext.Provider value={currentTab}>
    <div className=' p-4 bg-lightGrey min-h-[100vh] dark:bg-veryDarkGrey flex-1 ' style={{gridColumn: 2, gridRow: 2}}>
        {/* <Emptyboard columnsList={columnsList}/> */}
        <Task currentTab={currentTab} data={data} addColumn={open} />
        {!showSidebar && <Showsidebar setShowSidebar={setShowSidebar}/>} 
    </div>
    {openEditBoard && <Modal handleClose={close} component={<EditBoard closeModal={close}/>} />}
    </BoardContext.Provider>
  )
}

export default Board