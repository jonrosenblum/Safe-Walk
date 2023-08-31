import logo from './logo.svg';
import './App.css';
import Map from './Components/Map/Map';
import { useEffect, useState } from 'react';
import AutoComplete from './Components/AutoComplete/AutoComplete';
import { LoadScript } from '@react-google-maps/api';

const libraries = ["places", 'visualization']
function App() {

  const [originLatLng, setOriginLatLng] = useState({ lat: 0, lng: 0 });
  let myRoute = null;
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [addresses, setAddressess] = useState([]);
  const [destinationLatLng, setDestinationLatLng] = useState({ lat: 0, lng: 0 });
  const [empty, setEmpty] = useState(false);
  const [duration, setDuration] = useState();
  const [addAddress, setAddAddress] = useState(false);
  const [destinationAddress, setDestination] = useState('');
  const [addressToState, setAddressToState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [distance, setDistance] = useState('');

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      position => {

        setOriginLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })

      },
      error => {
        console.error("Error getting location: ", error);
      }
    );
    // CrimeMeter()
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("contactName", name);
    localStorage.setItem("mobileNumber", phoneNumber);
    setName('');
    setPhoneNumber('');
  }

  const handleAddAddressDialoge = () => {
    setEmpty(true)
    setAddAddress(true)
  }

  const handleSetAddress = (address) => {
    setDestination(address)
  }

  const handleDestinationLatLng = (lat, lng) => {
    setDestinationLatLng({ lat, lng });
  }

  const handleCalculateDistance = () => {
    const origin = new window.google.maps.LatLng(originLatLng.lat, originLatLng.lng); // Replace with actual origin latlng
    const destination = new window.google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng); // Replace with actual destination latlng

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'WALKING', // or 'DRIVING', 'BICYCLING', 'TRANSIT'
      },
      async (response, status) => {
        if (status === 'OK' && response.rows[0].elements[0]) {

          await handleDrawRoute();

          setDistance(response.rows[0].elements[0].distance.text);
          setDuration(response.rows[0].elements[0].duration.text);

          setAddAddress(false);
          setAddressToState(false);

          if (isEdit) {
            const updateAddresses = addresses;
            const obj = { direction: myRoute, destinationAddress: destinationAddress, distance: response.rows[0].elements[0].distance.text, duration: response.rows[0].elements[0].duration.text, originLatLng, destinationLatLng }
            updateAddresses[selectedItem] = obj
            setAddressess(updateAddresses);
          } else {
            setAddressess([...addresses, { direction: myRoute, destinationAddress: destinationAddress, distance: response.rows[0].elements[0].distance.text, duration: response.rows[0].elements[0].duration.text, originLatLng, destinationLatLng }])
            setSelectedItem(addresses.length)
          }
        } else {
          console.error('Distance Matrix request failed:', status);
        }
      }
    );
  };

  const handleDrawRoute = async () => {
    const origin = new window.google.maps.LatLng(originLatLng.lat, originLatLng.lng); // Replace with actual origin latlng
    const destination = new window.google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng); // Replace with actual destination latlng

    const directionsService = new window.google.maps.DirectionsService();
    await directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'WALKING', // or 'DRIVING', 'BICYCLING', 'TRANSIT'
      },
      (result, status) => {
        if (status === 'OK') {
          myRoute = result;
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  };

  const handleSelectItem = (i) => {
    setSelectedItem(i);
  }

  const handleDeleteItem = () => {
    const arr = [...addresses];
    arr.splice(selectedItem, 1);
    setAddressess(arr);
    setAddAddress(false);
    setEmpty(false);
    setSelectedItem(addresses.length - 1);
  }


  return (
    <LoadScript googleMapsApiKey="AIzaSyB5uijdNdiYHE6vfZO_aFNb-Lq_pjZxMVA" libraries={libraries}>

      <div className="App">
        <svg className="hide">
          <defs>
            <symbol id="commutes-add-icon">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </symbol>
          </defs>
          <use href="#commutes-add-icon" />
        </svg>
        {addressToState && handleCalculateDistance()}
        <main className="commutes">

          <div className="contacts">
            <form>
              <label htmlFor="exampleContactName">add emergency contact</label>
              <input
                type="text"
                className="form-control name"
                id="exampleContactName"
                aria-describedby="contactName"
                placeholder="  name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="examplePhoneNumber"></label>
              <input
                type="tel"
                value={phoneNumber}
                className="form-control mobileNumber"
                id="examplePhoneNumber"
                placeholder="  mobile number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button type="button" onClick={() => handleSubmit()} className="btn btn-primary submit">  submit</button>
            </form>
          </div>

          <div style={{ height: '70vh', width: '100%' }}>
            <Map myLocation={originLatLng} addresses={addresses} selectedItem={selectedItem} handleSelectItem={(i) => handleSelectItem(i)} />
          </div>

          <div className="commutes-info">
            <div className="commutes-initial-state" style={{ display: `${addresses.length > 0 ? 'none' : 'flex'}` }}>
              <div className="description">
                <h1 className="heading">find your safe walk home</h1>
                <p>see travel time, directions, and zones to avoid</p>
              </div>
              <button className="add-button" onClick={() => handleAddAddressDialoge()}>
                <svg
                  aria-label="Add Icon"
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#commutes-add-icon" />
                </svg>
                <span className="label">home</span>
              </button>
            </div>

            <div className="commutes-destinations" style={{ display: `${addresses.length > 0 ? 'flex' : 'none'}` }}>
              <div className="destinations-container">
                <div className="destination-list">
                  {addresses.map((item, i) => {
                    return (
                      <div className={`destination ${selectedItem == i ? 'active' : ''}`} onClick={() => handleSelectItem(i)} tabIndex={i} role="button">
                        <div className="destination-content">
                          <div className="metadata">{item?.distance}</div>
                          <div className="address">To <abbr title={item?.destinationAddress}>{item?.destinationAddress}</abbr></div>
                          <div className="destination-eta">{item?.duration}</div>
                        </div>
                        <div className="destination-controls">
                          <button onClick={() => { handleSelectItem(i); handleAddAddressDialoge(); setEdit(true); }} className="edit-button" aria-label="Edit Destination">
                            Edit
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button onClick={() => handleAddAddressDialoge()} className="add-button">
                  <svg
                    aria-label="Add Icon"
                    width="24px"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#commutes-add-icon" />
                  </svg>
                  <div className="label">add alternative address</div>
                </button>
              </div>
              <button
                className="left-control"
                data-direction="-1"
                aria-label="Scroll left"
              >
                <svg
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  data-direction="-1"
                >
                  <use href="#commutes-chevron-left-icon" data-direction="-1" />
                </svg>
              </button>
              <button
                className="right-control hide"
                data-direction="1"
                aria-label="Scroll right"
              >
                <svg
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  data-direction="1"
                >
                  <use href="#commutes-chevron-right-icon" data-direction="1" />
                </svg>
              </button>
            </div>
          </div>
        </main>
        <div className="commutes-modal-container" style={{ display: `${addAddress ? 'block' : 'none'}` }}>
          <div className="commutes-modal">

            <div className="content">
              <h2 className="heading">add home address</h2>
              <form id="destination-form">
                <AutoComplete hideDialog={(e) => setAddAddress(e)} empty={empty} handleSetAddress={(e) => handleSetAddress(e)} handleDestinationLatLng={(e, x) => handleDestinationLatLng(e, x)} />
                <div className="error-message"></div>

              </form>
              <div className="modal-action-bar">

                <button className={`delete-destination-button ${isEdit ? '' : 'hide'}`} onClick={() => handleDeleteItem()} type="reset">Delete</button>
                <button className="cancel-button mr-4" onClick={() => { setAddAddress(false); setEmpty(false) }} type="reset">Cancel</button>

                <button className={`add-destination-button ${isEdit ? 'hide' : ''}`} onClick={() => { setAddressToState(true); setEmpty(false) }} type="button">Add</button>
                <button className={`edit-destination-button ${isEdit ? '' : 'hide'}`} onClick={() => { setAddressToState(true); setEmpty(false) }} type="button">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </LoadScript>
  );
}

export default App;
