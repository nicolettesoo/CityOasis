import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '70%'
    },
  };

const LogoutButton = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    // const [isLoggedIn, setIsLoggedIn] = useState()

    // useEffect(() => {
    //   fetch('/isLoggedIn')
    //   .then(result => setIsLoggedIn(!(result.status == 500)))

    // },[modalIsOpen])

    function openModal() {
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }


    const logout = (e) =>  {
        fetch('/logout')
        .then(resp => props.setIsLoggedIn(false))
        .then(resp => {
            openModal()
            props.getFountains(props.lat, props.lon)
        })
    }

    console.log('props in logout', props)
    return (
        <>
        {props.isLoggedIn && <button 
            type = "button"
            className="float-right h-10 w-32 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2.5 text-center me-2 mb-2"
            onClick={(e => logout(e))}>Log Out
        </button>}
        {!props.isLoggedIn && <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={customStyles}
            >
             <button className="text-lg text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={closeModal}>Exit</button>
          <p className='px-14 text-indigo-500 text-3xl background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>You are logged out</p>
        </Modal>}
        </>
    )
}

export default LogoutButton