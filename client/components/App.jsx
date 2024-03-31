import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Map from './Map.jsx'
import ClipLoader from "react-spinners/ClipLoader";


const App = () => {
  const [locations, setLocations] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [currentFountain, setCurrentFountain] = useState()
  const [locationLoading, setLocationLoading] = useState(false)
  let dataArray = []
  // let directionsService;
  // let directionsRenderer;
  //let lat;
  //let lon;

  const handleSubmit = (e) => {
    e.preventDefault();
    getAddress(e.target[0].value)
  }

  const handleClick = (e, fountainLongitude, fountainLatitude) => {
    console.log('i am clicking')
    console.log('fountain coords', fountainLatitude, fountainLongitude)
    setCurrentFountain({"latitude": fountainLatitude, "longitude":fountainLongitude})
  }


  const getFountains = (latitude, longitude) => {
    const body = {}
    body.position = [latitude, longitude]

    //console.log(body.position)
    fetch('/getWaterFountains', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then((data) => {
        setLocationLoading(false)
        setLocations(data)
        console.log('data from request', data)
      })
    }

    const getLocation = async (e) => {
        //console.log('i am getting location')
        setLocationLoading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            getFountains(position.coords.latitude, position.coords.longitude)
        })
    }

    const getAddress = (address) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address}, function(results, status) {
        console.log('results of geocoder', results[0].geometry.location.toString())
        let coordinates = results[0].geometry.location.toString()
        coordinates = coordinates.slice(1,-1)
        coordinates = coordinates.split(', ')
        const newCoordinates = coordinates.map((coordinate) => Number(coordinate))
        console.log(newCoordinates)
        setLat(newCoordinates[0])
        setLon(newCoordinates[1])
        getFountains(newCoordinates[0], newCoordinates[1])
      })
  
    }

    for(let location of locations){
      dataArray.push(<button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-large rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2 h-60"
      onClick={e => handleClick(e, location.x, location.y)}>
        <p><span className="text-4xl font-bold text-cyan-200">Location:</span> <span>{location.location}</span></p>  
        {location.description && <p><span className="text-4xl font-bold text-cyan-200">Details:</span> <span>{location.description}</span></p>} 
        <p>{(location.distance).toFixed(2)} Miles</p></button>)
      //dataArray.push(<button>{location.x} {location.y}</button>)
    }

    const handleChange = e => {
      const input = document.getElementById("locationInput");
      console.log("my input is ", input)
      const autocomplete = new google.maps.places.Autocomplete(input, {});
    }



    return (
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <div className="flex items-center space-x-48">
          <button 
            type = "button"
            className="h-32 w-72 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2"
            onClick={(e => getLocation(e))}>Use current location
          </button> 
          <div>
          {locationLoading &&  
            <ClipLoader
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
              color='green'
            />}
            </div>
          <form onSubmit={e => (handleSubmit(e))} className=" w-9/12 h-32 flex items-center border-b border-teal-500 py-2">
            <input type="text" id = "locationInput" name="name" onChange={e => handleChange(e)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-4xl " placeholder="Enter address" fontFamily="serif"/>
          <input type="submit" value="Use address" className=" h-28 w-44 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-2xl px-3 py-2.5 text-center me-2 mb-2"/>
        </form>
      </div>
        <div className="flex items-center">
          <div className="flex flex-col h-auto">{dataArray}</div>
          <Map lat={lat} lon={lon} currentFountain={currentFountain}></Map>
        </div>
      </div>
    )
  
}


export default App