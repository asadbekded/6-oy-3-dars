import React, { useRef } from 'react'

export const Modal = ({ title, modal, setModal, children }) => {

    const overlayRef = useRef();

    const handleClose = (evt) => {
        if(evt.target === overlayRef.current){
            setModal(false)
        }
    }

  return (
    <div ref={overlayRef} onClick={handleClose} style={{backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', top:0, bottom: 0, left:0, right:0, display:'flex', alignItems:'center', justifyContent: 'center' }}>
        <div className='w-50 mx-auto bg-white p-4 rounded'>
            <h3 className='mb-4'>{title}</h3>
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}
