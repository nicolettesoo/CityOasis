import React, { useState, useEffect } from 'react';

const App = () => {
const [locations, setLocations] = useState("Hi")
let arrayDataItems;
let directionsService;
let directionsRenderer;

const initMap =  (latitude, longitude) => {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: { lat: latitude, lng: longitude },
  });
  directionsRenderer.setMap(map);
  return
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, data, lat, lon) {
  directionsService
    .route({
      origin: {
        query: `${lat},${lon}`,
      },
      destination: {
        query: `${data.y},${data.x}`,
      },
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + e));
}	


const getFountains = (lat, lon) => {

  const body = {}
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
      //setLocations(data);
      setLocations(data)
      calculateAndDisplayRoute(directionsService, directionsRenderer, data[0], lat, lon)
    })
  }

  const getLocation = async (e) => {

       navigator.geolocation.getCurrentPosition((position) => {
          initMap(position.coords.latitude,  position.coords.longitude);
          getFountains(position.coords.latitude, position.coords.longitude);

      })

  }

  let data = []
  for(let location of locations){
    data.push(<p>{location.x} {location.y}</p>)
  }

    return (
    <>
    <button onClick={(e => getLocation(e))}>Get location</button> 
    {data}
    </>
    )
}

const Data = (props) => {
  //console.log(props)
}

export default App