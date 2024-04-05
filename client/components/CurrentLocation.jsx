import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const CurrentLocation = (props) => {

    return (
        <>
            <button 
                type = "button"
                className="h-32 w-72 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2"
                onClick={(e => props.getLocation(e))}>Use current location
            </button> 
            <div>
                {props.locationLoading &&  
                <ClipLoader
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color='green'
                />}
            </div>
        </>
    )
} 

export default CurrentLocation