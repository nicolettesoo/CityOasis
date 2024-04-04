import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root')

const SignupButton = (props) => { 
    let subtitle;
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
    }

  function openModal() {
      setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

return(
<div>
  <button onClick={openModal} className=" h-10 w-32 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2.5 text-center me-2 mb-2">Sign up</button>
  <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
  >
    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Please sign up</h2>
    <button onClick={closeModal}>close</button>
    <form onSubmit={e => (signup(e))} className=" w-58 h-10 flex items-center border-b border-teal-500 py-2">
            <input type="text" id = "username" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-2xl " placeholder="Enter username" fontFamily="serif"/>
            <input type="password" id = "password" name="name" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-2xl " placeholder="Enter password" fontFamily="serif"/>
          <input type="submit" value="Sign up" className=" h-10 w-20 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2.5 text-center me-2 mb-2"/>
    </form> 
  </Modal>
</div>
)
}


export default SignupButton