
import React, { useState, useEffect } from 'react'
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
      width: '50%',
      height: '50%'
    },
  };


const FountainModal = (props) => {
    let subtitle
    const [showForm, setShowForm] = useState(false)
    const [notes, setNotes] = useState(props.notes)
    const [hasnote, setHasNote] = useState(props.hasnote)

    const deleteDetails = (e, fountain_id) => {
        const body = {}
        body.fountain_id = fountain_id
        fetch('/addDetails', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
          })
          .then((arg) => {
                setHasNote(false)
                setShowForm(false)
            }
          )
    }

    const editNote = (e) => {
        setShowForm(true)
    }

    const editDetails = (e, fountain_id) => {
        e.preventDefault();
        const body = {}
        body.details = e.target[0].value
        body.fountain_id = fountain_id
        fetch('/addDetails', {
            method: 'PUT',
            headers: {
              'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
          })
          .then(setNotes(e.target[0].value))
    }

    const addDetails = (e, fountain_id) => {
        e.preventDefault();
        const body = {}
        body.details = e.target[0].value
        body.fountain_id = fountain_id
        fetch('/addDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
          })
          .then(setHasNote(true))
          .then(setNotes(e.target[0].value))
          .then(setShowForm(false))
      }


    useEffect (() => {
        setNotes(props.notes)
        setHasNote(props.hasnote)

    }, [props.notes])
    

    const closeModal = (() => {
        setShowForm(false)
        props.updateCloseModal()
    })


    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={customStyles}
        > 
        <button className="text-2xl text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={closeModal}>Exit</button>
        { ! hasnote && 
            <form onSubmit={e => (addDetails(e, props.fountain_id))} className="flex items-center pb-8 w-9/12 h-32 border-b border-teal-500 py-2">
                <input type="text" id = "addDetails" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl " placeholder="Add note to self here" fontFamily="serif"/>
                <input type="submit" value="Add Details" className=" h-16 w-32 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-lg px-3 py-2.5 text-center me-2 mb-2"/>
            </form>
        }
        <div className="flex items-center space-x-24 ">
        { hasnote && 
        <div>
         <p className="text-3xl h-44 w-96 text-center text-indigo-700 my-8 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md">{notes}</p>  
            <div className='flex items-center'>
                <button 
                className="w-6/12 h-12 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={editNote}>Edit</button>
                <button 
                className="w-6/12 h-12 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={e => (deleteDetails(e, props.fountain_id))}>Delete</button>
            </div>
        </div>
        }
        {showForm && 
        <form onSubmit={e => (editDetails(e, props.fountain_id))} className="w-9/12 h-32 flex items-center border-b border-teal-500 py-2">
             <input type="text" id = "addDetails" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-4xl " placeholder="Edit note" fontFamily="serif"/>
            <input type="submit" value="Add Details" className=" h-28 w-44 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-2xl px-3 py-2.5 text-center me-2 mb-2"/>
        </form>
        }
        </div>
        </Modal>
    )
}

export default FountainModal