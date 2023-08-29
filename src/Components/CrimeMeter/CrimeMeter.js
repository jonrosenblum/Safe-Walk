
const CrimeMeter = () => {
    const origin = {
        lat: 31.544256,
        lng: 74.349402
    }

    function getTheDate() {
        var currentdate = new Date();
        var datetime = {
            year: currentdate.getFullYear(),
            month: (currentdate.getMonth() + 1),
            day: currentdate.getDate(),
            hour: currentdate.getHours(),
            minute: currentdate.getMinutes(),
            second: currentdate.getSeconds()
        }
        return datetime
    }

    let lat = 31.544256;
    let lon = 74.349402;
    let date = getTheDate();
    let iniYear = date.year - 1;
    let endYear = date.year;
    let iniEndMonth = date.month.toString();
    if (iniEndMonth.length < 2) {
        iniEndMonth = "0" + iniEndMonth;
    }
    let iniEndDay = date.day.toString();
    if (iniEndDay.length < 2) {
        iniEndDay = "0" + iniEndDay;
    }


    // fetch("https://api.crimeometer.com/v1/incidents/raw-data?lat=" + lat + "&lon=" + lon + "&datetime_ini=" + iniYear + "-" + iniEndMonth + "-" + iniEndDay + "T14:59:55.711Z&datetime_end=" + endYear + "-" + iniEndMonth + "-" + iniEndDay + "T14:59:55.711Z&distance=10mi",
    //     { headers: { 'x-api-key': 'WDlcm60zfj51AnxWmupgB5Vu9qz5WJLl5nxrvKr6' } })
    //     .then((data) =>
    //         data.json().then((data) => {
    // console.log(data,'crime data');

    // if (data && data.incidents && data.incidents.length > 0) {
    //     for (let i = 0; i < data.incidents.length; i++) {
    //         let incident_lat = data.incidents[i].incident_latitude;
    //         let incident_lon = data.incidents[i].incident_longitude;
    //         let heatMapDynamicData = []
    //         if (data.incidents[i].incident_offense === "Assault Offenses") {
    //             var crimeDataObj = {
    //                 location: new window.google.maps.LatLng(incident_lat, incident_lon),
    //                 weight: 50
    //             }
    //             heatMapDynamicData.push(crimeDataObj);
    //         }
    //         if (data.incidents[i].incident_offense === "Robbery") {
    //             var crimeDataObj = {
    //                 location: new window.google.maps.LatLng(incident_lat, incident_lon),
    //                 weight: 25
    //             }
    //             heatMapDynamicData.push(crimeDataObj);
    //         }
    //         if (data.incidents[i].incident_offense === "Larceny/Theft Offenses") {
    //             var crimeDataObj = {
    //                 location: new window.google.maps.LatLng(incident_lat, incident_lon),
    //                 weight: 15
    //             }
    //             heatMapDynamicData.push(crimeDataObj);
    //         }

    //         var gradient = [
    //             'rgba(0, 255, 255, 0)',
    //             'rgba(0, 255, 255, 1)',
    //             'rgba(0, 191, 255, 1)',
    //             'rgba(0, 127, 255, 1)',
    //             'rgba(0, 63, 255, 1)',
    //             'rgba(0, 0, 255, 1)',
    //             'rgba(0, 0, 223, 1)',
    //             'rgba(0, 0, 191, 1)',
    //             'rgba(0, 0, 159, 1)',
    //             'rgba(0, 0, 127, 1)',
    //             'rgba(63, 0, 91, 1)',
    //             'rgba(127, 0, 63, 1)',
    //             'rgba(191, 0, 31, 1)',
    //             'rgba(255, 0, 0, 1)'
    //         ]

    //         var heatmap = new window.google.maps.visualization({
    //             data: heatMapDynamicData
    //             // data: heatMapStaticData
    //         });

    //         heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    //         // heatmap.setMap(new window.google.maps);
    //     }
    // }
    //     })
    // )

}

export default CrimeMeter;