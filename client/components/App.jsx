import React, { useState, useEffect } from 'react';

const App = () => {
const [locations, setLocations] = useState([])
const [lat, setLat] = useState()
const [lon, setLon] = useState()
const [directionsService, setdirectionsService] = useState()
const [directionsRenderer, setdirectionsRenderer] = useState()
let dataArray = []
// let directionsService;
// let directionsRenderer;
//let lat;
//let lon;

const handleClick = (e, fountainLatitude, fountainLongitude) => {
  console.log('i am clicking')
  calculateAndDisplayRoute(directionsService, directionsRenderer, fountainLatitude, fountainLongitude, lat, lon)
}

const initMap =  (latitude, longitude, data) => {
//console.log('latitude is', latitude)
  // directionsService = new google.maps.DirectionsService();
  // directionsRenderer = new google.maps.DirectionsRenderer();
  const dirRender = new google.maps.DirectionsRenderer()
  setdirectionsService(new google.maps.DirectionsService())
  setdirectionsRenderer(dirRender)
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: { lat: latitude, lng: longitude },
  });
  console.log(directionsService, directionsRenderer)
  //directionsRenderer.setMap(map);
  dirRender.setMap(map)
}


function calculateAndDisplayRoute(directionsService, directionsRenderer, fountainLatitude, fountainLongitude, lat, lon) {
  console.log(lat, lon, fountainLatitude, fountainLongitude)
  directionsService
    .route({
      origin: {
        query: `${lat},${lon}`,
      },
      destination: {
        query: `${fountainLongitude},${fountainLatitude}`,
      },
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .then(response => console.log(response))
    .catch((e) => window.alert("Directions request failed due to " + e));
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
          initMap(position.coords.latitude, position.coords.longitude);
          getFountains(position.coords.latitude, position.coords.longitude)
      })
  }

    for(let location of locations){
      dataArray.push(<button className='waterFountainLocation' onClick={(e => handleClick(e, location.x,location.y))}>
        <p>{location.location}</p>  
        <p>{location.description}</p>  
        <p>{location.distance}</p></button>)
      //dataArray.push(<button>{location.x} {location.y}</button>)
    }

    return (
    <>
    <button onClick={(e => getLocation(e))}>Get location</button> 
     {dataArray}
    </>
    )
}

const Data = (props) => {
  //console.log(props)
}

export default App