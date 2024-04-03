import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root')

const FountainModal = (props) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false)

    const addDetails = (e, fountain_id) => {
        console.log('fountainid', fountain_id)
        e.preventDefault();
        const body = {}
        body.details = e.target[0].value
        body.fountain_id = fountain_id
        //console.log(body.position)
        fetch('/addDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
      }

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
          }
        })
        .catch(err => console.log(err))
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'blue';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    return (
        <>
            <a onClick={openModal}>Add notes</a>
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            > 
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Enter additional details here for {props.fountain_id}</h2> 
            <button onClick={closeModal}>Exit</button>
            <form onSubmit={e => (addDetails(e, props.fountain_id))} className=" w-9/12 h-32 flex items-center border-b border-teal-500 py-2">
                <input type="text" id = "addDetails" name="name"className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-4xl " placeholder="Add note to self here" fontFamily="serif"/>
                <input type="submit" value="Add Details" className=" h-28 w-44 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-2xl px-3 py-2.5 text-center me-2 mb-2"/>
            </form>
            </Modal>
        </>
    )
}

export default FountainModal