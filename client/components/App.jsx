import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Map from './Map.jsx'

const App = () => {
  const [locations, setLocations] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [currentFountain, setCurrentFountain] = useState()
  let dataArray = []
  // let directionsService;
  // let directionsRenderer;
  //let lat;
  //let lon;

  const handleClick = (e, fountainLongitude, fountainLatitude) => {
    console.log('i am clicking')
    console.log('fountain coords', fountainLatitude, fountainLongitude)
    setCurrentFountain({"latitude": fountainLatitude, "longitude":fountainLongitude})
  }


  const getFountains = (lat, lon) => {
    const body = {}
    console.log('in fetch request', lat, lon)
    body.position = [lat, lon]
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
        setLocations(data)
        console.log(data)
      })
    }

    const getLocation = async (e) => {
        //console.log('i am getting location')
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            getFountains(position.coords.latitude, position.coords.longitude)
        })
    }

    for(let location of locations){
      dataArray.push(<button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={e => handleClick(e, location.x, location.y)}>
        <p>Location: {location.location}</p>  
        {location.description && <p>Details: {location.description}</p>} 
        <p>{Math.round(location.distance,3)} Miles</p></button>)
      //dataArray.push(<button>{location.x} {location.y}</button>)
    }

    console.log('i am rerendering')
    return (
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      <button 
      type = "button"
      className="mx-120 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={(e => getLocation(e))}>Get location
      </button> 
        {dataArray}
        <Map lat={lat} lon={lon} currentFountain={currentFountain}></Map>
      </div>
    )
  
}


export default App