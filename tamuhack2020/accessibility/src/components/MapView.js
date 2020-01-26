import React, { Component } from 'react';
import L from 'leaflet';
import './MapView.css';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const zoomLevel = 14;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat : this.props.lat,
      lng : this.props.lng,
      markers : []
    };
  }
  
  handleClick = (e) => {
    const markers = this.state.markers;
    let coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    markers.push(coord);
    this.setState({markers : markers})
  };

  componentDidMount() {
    // Grab all the locations from the server and create markers for them
    const markers = this.state.markers;
    this.props.getLocations().then(loc => {
      console.log(loc);
      if (loc.status === "success") {
        loc.result.forEach(loc => markers.push(loc))
        console.log(markers);
        this.setState({markers : markers});
      }
    });
  }

  render() {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    //L.Marker.prototype.options.icon = DefaultIcon;

    return (
      <div className='App'>
        <Map
          style={{
            height: "90vh",
            width : "600px",
          }}
          center={[this.state.lat,this.state.lng]}
          zoom={zoomLevel}
          onClick={this.handleClick}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.markers.map((ptr, idx) => 
            <Marker icon={DefaultIcon} key={`marker-${idx}`} position={[ptr.lat,ptr.lng]}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
              <a href="">Link to Profile</a>
            </Popup>
          </Marker>
          )}
        </Map>
      </div>
    );
  }
}

export default MapView;

