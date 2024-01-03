import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import './index.css';

const mapContainerStyle = {
  width: '99vw',
  height: '97vh',
};

const MapsScreen = () => {
  const [placeName, setPlaceName] = useState<string>('');
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 7.2905715,
    lng: 80.6337262,
  });
  const handleValue = async (place: any) => {
    if (!place) return;
    console.log('Data', place.label);
    setPlaceName(place.label);

    await geocodeByAddress(place.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Successfully got latitude and longitude', { lat, lng });
        setLocation({ lat: lat, lng: lng });
      });
  };
  const handleSubmit = () => {
    console.log(placeName, location);
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(
          'Lat: ',
          position.coords.latitude,
          'Long: ',
          position.coords.longitude
        );
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log('Geolocation is not available in your browser.');
    }
  }, []);
  const customMarker = {
    path: `M0.707,13.438H13.457 M3.86,5.687l3.222-2.53l3.222,2.53 M4.35,7.813h5.464v5.625H4.35v-5.002 M3.238,5.688h7.688v2.121H3.238M1.618,7.81v5.628M12.546,7.81v5.625M0.707,7.81h12.75 M7.082,3.156V0.674m0,0h1.25M6.095,11.203a0.93,0.93,0,0,1,0.931-0.93v0a0.93,0.93,0,0,1,0.931,0.93v2.235H6.095z`,
    fillColor: 'orange',
    fillOpacity: 0.7,
    strokeWeight: 2,
    strokeColor: 'black',
    rotation: 0,
    scale: 4, // Increase the scale factor to enlarge the path
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          onChange: handleValue,
        }}
        autocompletionRequest={{
          bounds: [
            { lat: 23.6345, lng: 60.872972 },
            { lat: 37.084107, lng: 77.831879 },
          ],
          componentRestrictions: {
            country: 'PK',
          },
        }}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={location}
      >
        <>
          <Marker
            position={location}
            icon={customMarker}
            onMouseOver={() => setIsInfoWindowOpen(true)}
            onMouseOut={() => setIsInfoWindowOpen(false)}
          />
          {placeName && (
            <button className="submitButton" onClick={handleSubmit}>
              Submit
            </button>
          )}
          {isInfoWindowOpen && (
            <InfoWindow
              position={location}
              onCloseClick={() => setIsInfoWindowOpen(false)}
            >
              <div>
                <p>Content to display when hovered</p>
                <p>Place any information you want here!</p>
              </div>
            </InfoWindow>
          )}
        </>
      </GoogleMap>
    </div>
  );
};

export default MapsScreen;
