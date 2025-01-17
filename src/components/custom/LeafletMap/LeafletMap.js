import React, { useContext, useState, useEffect } from 'react';
import { Map } from 'react-leaflet';

import MarkerCluster from './MarkerCluster';
import 'leaflet.tilelayer.colorfilter';
import L from 'leaflet';
import { useRef } from 'react';
import AppContext from '../../../context/Context';

const LeafletMap = (props) => {
  const { isDark } = useContext(AppContext);
  const [geoJson, setGeoJson] = useState();
  const [markers, setMarkers] = useState([{}]);
  const filter = isDark
    ? ['invert:98%', 'grayscale:69%', 'bright:89%', 'contrast:111%', 'hue:205deg', 'saturate:1000%']
    : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

  let mapRef = useRef();
  useEffect(() => {
    setGeoJson(props.geoJson);
    setMarkers(props.markers);
  }, []);

  setTimeout(() => {

    if (mapRef.current) {
      L.tileLayer
        .colorFilter('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: null,
          transparent: true,
          filter: filter
        })
        .addTo(mapRef.current.leafletElement);

      L.geoJson(geoJson).addTo(mapRef.current.leafletElement);

    }
  });

  return (

    <Map
      center={[10.737, 0]}
      zoom={1}
      minZoom={1}
      maxZoom={18}
      zoomSnap={0.5}
      className="h-100 bg-white"
      style={{ width: '100%', minHeight: 300 }}
      ref={mapRef}
    >
      <MarkerCluster markers={markers} />
    </Map>

  );
};

export default LeafletMap;
