import React, { useState, useEffect } from 'react'
import FountainModal from './FountainModal.jsx';

const FountainFooter = (props) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
      //redirect to login 
      fetch('/addDetails')
      //when complete then
      .then(result => {
        if (result.status == 500) {
          alert('Please log in')
        }
        else {
          setIsOpen(true)
          props.setIsLoggedIn(true)
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
          <FountainModal 
            fountain_id = {props.fountain_id} hasnote = {props.hasnote} notes = {props.notes} openModal={openModal} 
            updateCloseModal={closeModal} modalIsOpen = {modalIsOpen}
          />
        </>
    )
}

export default FountainFooter