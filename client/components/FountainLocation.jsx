import React, { useState, useEffect } from 'react'
import FountainFooter from './FountainFooter.jsx';

const FountainLocation = (props) => {
    const location = props.location
    console.log('location is: ',location)

    return (
        <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-large rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2 h-60"
        onClick={e => props.handleClick(e, location.x, location.y)}>
            <p><span className="text-4xl font-bold text-cyan-200">Location:</span> <span>{location.location}</span></p>  
            {location.description && <p><span className="text-4xl font-bold text-cyan-200">Details:</span> <span>{location.description}</span></p>} 
            <p>{(location.distance).toFixed(2)} Miles</p>
            <FountainFooter 
                fountain_id = {location.fountain_id} 
                hasnote = {location.hasnote} 
                notes={location.notes} 
                updateFountains={props.updateFountains}
                userLocation = {props.userLocation}
            ></FountainFooter>
      </button>
    )
}

export default FountainLocation