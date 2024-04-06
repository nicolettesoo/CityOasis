import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Map from './Map.jsx'
import Modal from 'react-modal';
import FountainLocation from './FountainLocation.jsx';
import LoginButton from './LoginButton.jsx';
import SignupButton from './SignupButton.jsx';
import AddressInputForm from './AddressInputForm.jsx';
import LogoutButton from './LogoutButton.jsx';
import CurrentLocation from './CurrentLocation.jsx';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer} from '@react-google-maps/api';

const libraries = ['places'];
Modal.setAppElement('#root')

const App = () => {
  const [locations, setLocations] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [currentFountain, setCurrentFountain] = useState()
  const [locationLoading, setLocationLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState()

  let dataArray = []


    useEffect(() => {
      fetch('/isLoggedIn')
      .then(result => setIsLoggedIn(!(result.status == 500)))
    },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    getAddress(e.target[0].value)
  }

  const handleClick = (e, fountainLongitude, fountainLatitude) => {
    setCurrentFountain({"latitude": fountainLatitude, "longitude":fountainLongitude})
  }

  const getFountains = (latitude, longitude) => {
    if(!latitude || !longitude) {
      return
    }
    const body = {}
    body.position = [latitude, longitude]
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
      })
    }

    const getLocation = async (e) => {
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
        let coordinates = results[0].geometry.location.toString()
        coordinates = coordinates.slice(1,-1)
        coordinates = coordinates.split(', ')
        const newCoordinates = coordinates.map((coordinate) => Number(coordinate))
        setLat(newCoordinates[0])
        setLon(newCoordinates[1])
        getFountains(newCoordinates[0], newCoordinates[1])
      })
  
    }

    dataArray = locations.map((location) => { 
      return <FountainLocation location={location} handleClick={handleClick} updateFountains={getFountains} userLocation={[lat, lon]} setIsLoggedIn={setIsLoggedIn}></FountainLocation>
    })

    const handleChange = e => {
      const input = document.getElementById("locationInput");
      const autocomplete = new google.maps.places.Autocomplete(input, {});
    }

    return (
      <>        
        <SignupButton updateFountains={getFountains} userLocation={[lat, lon]} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <LoginButton updateFountains={getFountains} userLocation={[lat, lon]} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <LogoutButton getFountains={getFountains} lat={lat} lon={lon} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <div className="flex items-center space-x-48">
          <CurrentLocation getLocation={getLocation} locationLoading={locationLoading} />
          <AddressInputForm handleSubmit={handleSubmit} handleChange ={handleChange}/>
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