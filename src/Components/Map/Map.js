import React, { useEffect } from 'react';
import { GoogleMap, MarkerF, PolylineF, HeatmapLayerF } from '@react-google-maps/api';
import { useState } from 'react';
// import CrimeMeter from '../CrimeMeter/CrimeMeter';
import data from '../CrimeMeter/CrimeMeter.json'

const containerStyle = {
    width: '100%',
    height: '400px',
};

const style = [

    {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#000000' }], // Black background
    },
    {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#000000' }], // Black landscape
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [{ color: '#000000' }], // Black natural landscape
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#c979f7' }], // White roads and streets
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c979f7' }], // White country boundaries
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#c979f7' }], // White park lines
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#ca4cdb' }], // Red water areas
    },
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }], // Hide all labels
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ weight: 2 }], // Set the same line width for roads and streets
    },
    {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }], // Hide business POIs (houses)
    },
    {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }], // Hide transit icons
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ weight: 1 }], // Reduce the width of roads
    },
];

const Map = (props) => {

    const markerIconConfig = {
        path:
            'M10 27c-.2 0-.2 0-.5-1-.3-.8-.7-2-1.6-3.5-1-1.5-2-2.7-3-3.8-2.2-2.8-3.9-5-3.9-8.8C1 4.9 5 1 10 1s9 4 9 8.9c0 3.9-1.8 6-4 8.8-1 1.2-1.9 2.4-2.8 3.8-1 1.5-1.4 2.7-1.6 3.5-.3 1-.4 1-.6 1Z',
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new window.google.maps.Point(15, 29),
        scale: 1.2,
        labelOrigin: new window.google.maps.Point(10, 11),
    };

    const MARKER_ICON_COLORS = {
        active: {
            fill: '#B5F44A',
            stroke: '#B5F44A',
            label: '#B5F44A',
        },
        inactive: {
            fill: '#FFFFFF',
            stroke: '#FFFFFF',
            label: '#FFFFFF',
        },
    };

    const STROKE_COLORS = {
        active: {
            innerStroke: '#70EE9C',
            outerStroke: '#70EE9C',
        },
        inactive: {
            innerStroke: '#FFFFFF',
            outerStroke: '#FFFFFF',
        },
    };

    const originMarkerIcon = {
        ...markerIconConfig,
        fillColor: MARKER_ICON_COLORS.active.fill,
        strokeColor: MARKER_ICON_COLORS.active.stroke,
    };


    const destinationMarkerIcon = {
        ...markerIconConfig,
        fillColor: MARKER_ICON_COLORS.inactive.fill,
        strokeColor: MARKER_ICON_COLORS.inactive.stroke,
    };

    const [heatMapData, setHeatMapData] = useState([]);
    const handleMapLoad = () => {
        let heatMapDynamicData = []

        for (let i = 0; i < data.incidents.length; i++) {
            var incident_lat = data.incidents[i].incident_latitude;
            var incident_lon = data.incidents[i].incident_longitude;
            if (data.incidents[i].incident_offense === "Assault Offenses") {
                var crimeDataObj = {
                    location: new window.google.maps.LatLng(incident_lat, incident_lon),
                    weight: 50
                }
                heatMapDynamicData.push(crimeDataObj);
            }
            if (data.incidents[i].incident_offense === "Robbery") {
                var crimeDataObj = {
                    location: new window.google.maps.LatLng(incident_lat, incident_lon),
                    weight: 25
                }
                heatMapDynamicData.push(crimeDataObj);
            }
            if (data.incidents[i].incident_offense === "Larceny/Theft Offenses") {
                var crimeDataObj = {
                    location: new window.google.maps.LatLng(incident_lat, incident_lon),
                    weight: 15
                }
                heatMapDynamicData.push(crimeDataObj);
            }

            var gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ]

            // var heatmap = new window.google.maps.visualization.HeatmapLayer({
            //     data: heatMapDynamicData
            //     // data: heatMapStaticData
            // });

            // setHeatMapData(heatMapDynamicData);

            // heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
            // heatmap.setMap(map);
        }

        setHeatMapData(heatMapDynamicData)
    }

    useEffect(() => {
        setTimeout(() => {
            handleMapLoad();
        }, 1000);
    }, [])

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={props.myLocation} zoom={10}
            options={{
                styles: style,
                zoomControl: false, // Hides the zoom control
                mapTypeControl: false, // Hides the map type control
                streetViewControl: false, // Hides the street view control
            }}
            id='map'
        >
            {heatMapData && heatMapData.length > 0 && <HeatmapLayerF
                data={heatMapData}
                options={{
                    radius: 20,
                    opacity: 0.6,
                    gradient: [
                        'rgba(0, 255, 255, 0)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(0, 127, 255, 1)',
                        'rgba(0, 63, 255, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 0, 223, 1)',
                        'rgba(0, 0, 191, 1)',
                        'rgba(0, 0, 159, 1)',
                        'rgba(0, 0, 127, 1)',
                        'rgba(63, 0, 91, 1)',
                        'rgba(127, 0, 63, 1)',
                        'rgba(191, 0, 31, 1)',
                        'rgba(255, 0, 0, 1)'
                    ]
                }}
            />}
            <MarkerF icon={originMarkerIcon} key={999} position={props.myLocation} />
            {props.addresses && props.addresses.length > 0 && props.addresses.map((marker, i) => (
                <>
                    <MarkerF icon={destinationMarkerIcon} key={i} position={marker.destinationLatLng} />
                    <PolylineF
                        key={i + 2}
                        path={marker.direction.routes[0].overview_path}
                        options={{ strokeColor: props.selectedItem === i ? STROKE_COLORS.active.outerStroke : STROKE_COLORS.inactive.outerStroke, strokeWeight: 6 }}
                        onClick={() => props.handleSelectItem(i)}
                    />
                </>
            ))}
        </GoogleMap>
    );
};

export default Map;
