// const Map = function(props){
//     return <div id="map" className="mx-96 my-41 object-scale-down w-6/12 bg-red-50"></div>
//   }
/*global google*/
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '70vh',
  borderRadius: '25px'
};
let directionsService
const Map = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzWRVuy_IO3RyiAqvb5P3YlIT8Xp3jdew',
    libraries,
  });
  const [directions, setDirections] = useState()
  const [center, setCenter] = useState()

  if(isLoaded) {
    console.log("I am loaded")
    directionsService = new google.maps.DirectionsService();
  }

  useEffect(() => {
    // Update the document title using the browser API
    if(props.currentFountain){
        directionsService.route(
            {
                origin: `${props.lat},${props.lon}`,
                destination: `${props.currentFountain.latitude},${props.currentFountain.longitude}`,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log('status ok')
                    setDirections(result)
                } else {
                    console.log(result)
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
      }
  }, [props.currentFountain]);

  useEffect(() => {
    if(props.lat && props.lon){
      setCenter({
        lat: props.lat, // default latitude
        lng: props.lon, // default longitude
      });
      setDirections()
    }
  },[props.lat])



  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

 
  if(!props.lat) return (
    <div id ='map'></div>
  )

  return (
    <>
    {isLoaded && 
    <div id = 'map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
      >
        <Marker position={center} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
    }
    </>
  );
};



export default Map;