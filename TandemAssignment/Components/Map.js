// components/Map.js
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const Map = ({ path, stoppages }) => {
  return (
    <MapContainer center={[path[0].latitude, path[0].longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={path.map(p => [p.latitude, p.longitude])} />
      {stoppages.map((stop, index) => (
        <Marker key={index} position={[stop.latitude, stop.longitude]}>
          <Popup>
            Reach Time: {stop.start.toString()}<br />
            End Time: {stop.end ? stop.end.toString() : 'N/A'}<br />
            Duration: {stop.duration} minutes
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
