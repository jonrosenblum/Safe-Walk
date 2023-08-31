import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const AutoComplete = (props) => {

    const [query, setQuery] = useState('');
    const [city, setCity] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (props.empty) {
            setCity('');
            setQuery('');
        }
    }, [props.empty])

    const onPlaceChanged = async () => {
        if (autocompleteRef.current) {
            const addressObject = autocompleteRef.current.getPlace();
            const address = addressObject.address_components;
            if (address) {

                setCity(address[0].long_name);
                setQuery(addressObject.formatted_address, '   data ');
                props.handleSetAddress(address[0].long_name);

                const points = await getLatLongFromAddress(addressObject.formatted_address);

                props.handleDestinationLatLng(points.lat, points.lng);
            }
        }
    };

    const getLatLongFromAddress = async (address) => {
        const geocoder = new window.google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    const location = results[0].geometry.location;
                    resolve({ lat: location.lat(), lng: location.lng() });
                } else {
                    reject(status);
                }
            });
        });
    };


    const autocompleteRef = React.useRef(null);

    return (
        <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={onPlaceChanged}>
            <input
                type="text"
                placeholder="Enter a location"
                style={{ width: '100%' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </Autocomplete>
    );
};

export default AutoComplete;
