import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Map from './Map.jsx'
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-modal';
import FountainLocation from './FountainLocation.jsx';
import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';


Modal.setAppElement('#root')

const App = () => {
  const [locations, setLocations] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [currentFountain, setCurrentFountain] = useState()
  const [locationLoading, setLocationLoading] = useState(false)
  let dataArray = []


  const handleSubmit = (e) => {
    e.preventDefault();
    getAddress(e.target[0].value)
  }

  const handleClick = (e, fountainLongitude, fountainLatitude) => {
    setCurrentFountain({"latitude": fountainLatitude, "longitude":fountainLongitude})
  }

  const logout = (e) =>  {
    fetch('/logout')
    .then(resp => {
      getFountains(lat, lon)
    })
  }

  const getFountains = (latitude, longitude) => {
    const body = {}
    body.position = [latitude, longitude]
    console.log([latitude, longitude])
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
    console.log(locations)

    dataArray = locations.map((location) => { 
      return <FountainLocation location={location} handleClick={handleClick} updateFountains={getFountains} userLocation={[lat, lon]}></FountainLocation>
    })
    console.log('dataArray is :' + dataArray)

    const handleChange = e => {
      const input = document.getElementById("locationInput");
      console.log("my input is ", input)
      const autocomplete = new google.maps.places.Autocomplete(input, {});
    }

    return (
      <>
        <LoginButton updateFountains={getFountains} userLocation={[lat, lon]}/>
        <SignupButton/>
        <button 
          type = "button"
          className=" h-10 w-32 flex-shrink-0 mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium font-serif rounded-lg text-xl px-3 py-2.5 text-center me-2 mb-2"
          onClick={(e => logout(e))}>Log Out
        </button> 
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
     </>
    )
}


export default App