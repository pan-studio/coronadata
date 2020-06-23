import { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useLeaflet } from 'react-leaflet';
import { customMarker } from '../constants';

const mcg = L.markerClusterGroup({
  chunkedLoading: false,
  spiderfyOnMaxZoom: false,

});

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    /*  mcg.clearLayers();
      debugger;
      markers.map(({ data, stato, codice_regione, denominazione_regione,
        codice_provincia, denominazione_provincia, sigla_provincia, lat,
        long, note_it, note_en, totale_casi }) => {
        const popupContent = `
        <h6 class="mb-1">${denominazione_provincia} - (${sigla_provincia})</h6>
        <p class="m-0 text-500">Totale casi: ${totale_casi}</p>
      `;
        return L.marker(new L.LatLng(lat, long), {
          icon: customMarker
        })
          .addTo(mcg)
          .bindPopup(popupContent);
      });
  
      // optionally center the map around the markers
      // map.fitBounds(mcg.getBounds());
      // // add the marker cluster group to the map
      */
    markers.map(({ data, stato, codice_regione, denominazione_regione,
      codice_provincia, denominazione_provincia, sigla_provincia, lat,
      long, note_it, note_en, totale_casi }) => {
      L.circle([lat, long], totale_casi * 10).addTo(map);
    })

    //map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.string,
      stato: PropTypes.string,
      codice_regione: PropTypes.number,
      denominazione_regione: PropTypes.string,
      sigla_provincia: PropTypes.string,
      lat: PropTypes.number,
      long: PropTypes.number,
      note_it: PropTypes.string,
      note_en: PropTypes.string,
      totale_casi: PropTypes.number,

    }).isRequired
  ).isRequired
};

export default MarkerCluster;
