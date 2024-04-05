import React, { useState, useEffect } from 'react'


const AddressInputForm = (props) => {
    
    return (
        <form onSubmit={e => (props.handleSubmit(e))} className=" w-9/12 h-32 flex items-center border-b border-teal-500 py-2">
            <input type="text" id = "locationInput" name="name" onChange={e => props.handleChange(e)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-4xl " placeholder="Enter address" fontFamily="serif"/>
            <input type="submit" value="Use address" className=" h-28 w-44 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-2xl px-3 py-2.5 text-center me-2 mb-2"/>
        </form>
    )

}

export default AddressInputForm