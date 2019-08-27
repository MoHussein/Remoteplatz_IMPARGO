/* global fetch, L */
import React, { useEffect, useRef, useState } from 'react'
  import Moment from 'moment'

const getRouteSummary = (locations) => {
  const to = Moment(locations[0].time).format('hh:mm DD.MM')
  const from = Moment(locations[locations.length - 1].time).format('hh:mm DD.MM')
  return `${from} - ${to}`
}

const MapComponent = (props) => {

  const map = useRef()
  const [locations, setLocations] = useState()
  const [closestLocation, setClosestLocation] = useState()

  // Request location data.
  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((json) => {
              setLocations(json);
      })
  }, [])



  // TODO(Task 2): Request location closest to specified datetime from the back-end.
  useEffect(() => {
      fetch('http://localhost:3000/location/'+props.time)
          .then(response => response.json())
          .then((json) => {
              setClosestLocation(json);
          })
  }, [props.time])

  // Initialize map.
  useEffect(() => {
    map.current = new L.Map('mapid')
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution
    })
    map.current.setView(new L.LatLng(52.51, 13.40), 9)
    map.current.addLayer(osm)
  }, [])
  // Update location data on map.
  useEffect(() => {
    if (!map.current || !locations) {
      return // If map or locations not loaded yet.
    }
    // TODO(Task 1): Replace the single red polyline by the different segments on the map.
      var colorArray = ['#ff0702', '#FFB399', '#00FF00', '#FF0CAB', '#0364e6',
          '#FFF43D', '#000000', '#E0E900', '#99FF99', '#B34D4D',
          '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
          '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
          '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
          '#E666B3', '#33991A', '#0364E6', '#B3B31A', '#00E680',
          '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
          '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
          '#0080a0', '#4DB380', '#FF4D4D', '#0080A0', '#6666FF'];

      for (var i = 0; i < locations.length; i++) {
          const latlons = locations[i].map(({ lat, lon }) => [lat, lon])
          const polyline = L.polyline(latlons, { color: colorArray[i] }).bindPopup(getRouteSummary(locations[i])).addTo(map.current)
          map.current.fitBounds(polyline.getBounds())

      }

  }, [locations, map.current])

  // TODO(Task 2): Display location that the back-end returned on the map as a marker.
    useEffect(() => {
        if (!closestLocation) {
            return
        }
       L.marker([closestLocation["lat"] , closestLocation["lon"]]).addTo(map.current);
    }, [closestLocation])
  return (
    <div>
      {locations && `${locations.length} trips loaded`}
      {!locations && 'Loading...'}
      <div id='mapid' />
    </div>)
}

export default MapComponent
