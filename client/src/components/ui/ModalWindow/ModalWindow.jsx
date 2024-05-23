import React from 'react'
import "./ModalWindow.css"

const ModalWindow = ({children}) => {
  return (
    <div className="modal">
        <div className="modal_wrapper">
            {children}
        </div>
    </div>
  )
}

export default ModalWindow