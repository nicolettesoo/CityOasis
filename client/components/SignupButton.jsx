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
    width: '70%',
    height: '70%'
  },
};

const SignupButton = (props) => { 
    const [modalIsOpen, setIsOpen] = useState(false)

    const signup = (e) =>  {
      e.preventDefault();
      const body = {}
      body.username = e.target[0].value
      body.password = e.target[1].value
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
      .then(result => {
        props.updateFountains(props.userLocation[0], props.userLocation[1])
        props.setIsLoggedIn(true)
      })
    }

  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

return(
  <div>
  {!props.isLoggedIn && <button onClick={openModal} className="float-right h-10 w-32 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2.5 text-center me-2 mb-2">Sign Up</button>}
  {!props.isLoggedIn && <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    style={customStyles}
  >
    <button className="text-2xl text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    onClick={closeModal}>Exit</button>
    <form onSubmit={e => (signup(e))} className=" w-58 h-10 flex items-center border-b border-teal-500 py-2">
        <input type="text" id = "username" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-2xl " placeholder="Enter username" fontFamily="serif"/>
        <input type="password" id = "password" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-2xl " placeholder="Enter password" fontFamily="serif"/>
        <input type="submit" value="Sign up" className=" h-10 w-24 text-lg flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2 text-center me-2 mb-2"/>
    </form> 
  </Modal>}
  {props.isLoggedIn && <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    style={customStyles}
  >
    <button className="text-lg text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    onClick={closeModal}>Exit</button>
    <p className='px-14 text-indigo-500 text-3xl background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>You are logged in!</p>
  </Modal>}
</div>
)
}


export default SignupButton