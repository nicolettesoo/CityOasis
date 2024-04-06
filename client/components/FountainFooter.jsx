import React, { useState, useEffect } from 'react'
import FountainModal from './FountainModal.jsx';
import Modal from 'react-modal';


Modal.setAppElement('#root')

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

const FountainFooter = (props) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)

    function openModal() {
      //redirect to login 
      fetch('/addDetails')
      //when complete then
      .then(result => {
        if (result.status == 500) {
          //alert('Please log in')
          setLoggedIn(false)
          setIsOpen(true)
          console.log('loggedin', loggedIn)
        }
        else {
          setIsOpen(true)
          props.setIsLoggedIn(true)
          setLoggedIn(true)
        }
      })
      .catch(err => console.log(err))
    }

        
    function closeModal() {
      setIsOpen(false);
      props.updateFountains(props.userLocation[0], props.userLocation[1])
    }

    return (
        <>
          {!props.hasnote &&
            <svg onClick={openModal} className="h-8 w-8 text-lime-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          }
          {props.hasnote && 
            <svg onClick={openModal} class="h-8 w-8 text-lime-700"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
              <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="2" />  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
            </svg>
          }
          {loggedIn && <FountainModal 
            fountain_id = {props.fountain_id} hasnote = {props.hasnote} notes = {props.notes} openModal={openModal} 
            updateCloseModal={closeModal} modalIsOpen = {modalIsOpen}
          />}
          {!loggedIn && <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          style={customStyles}
        >
           <button className="text-lg text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={closeModal}>Exit</button>
          <p className='px-14 text-indigo-500 text-3xl background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Please log in</p>
        </Modal>}
        </>
    )
}

export default FountainFooter