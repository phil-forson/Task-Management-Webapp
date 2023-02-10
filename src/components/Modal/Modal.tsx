import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { ModalProps } from '../../types'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.3,
            type: "spring"
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}

const Modal = ({ handleClose, component }: ModalProps) => {

    useEffect(() => {
        console.log('modal Open')
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
            console.log('exiting')
        }

    }, [])
  return (
    <Backdrop onClick={handleClose}>
        <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            {component}
            {/* <button onClick={handleClose}>Close</button> */}
        </motion.div>

    </Backdrop>
  )
}

export default Modal