import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import MapView from '../components/MapView';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat : 30.6,
      lng : -96.3,
      server : "localhost:3030",
      debug_output : "start",
    };
  }

  setInitialLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        this.setState({lat:p.coords.latitude,lng:p.coords.longitude});
      });
    }
  };

  send(cmd, args) {
    return fetch(`http://64.227.48.56:3030/${cmd}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
    }).then(res => {
        return res.json();
    }).then(myjson => {
        return myjson;
    })
  }
  
  getLocations = () => {
    return this.send('getAllLocations', {test:"test"})
    .then(res => {
      return res;
    });
  };

  componentDidMount() {
    //this.setInitialLocation();
    console.log(this.send('test',{foo:'bar'}));
  }

  render() {
    return (
      <div className='App'>
        {['Test', 'Foo', 'Bar'].map(
          items => (
            <ButtonToolbar>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-split">
                  {items}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <form>
                      <label>
                        Name:
                      </label>
                      <input type="text" name="name" />
                      <input type="submit" value="Submit" />
                    </form>
                  </Dropdown.Item>
                  <Dropdown.Item>Anoo Action</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>

            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Modal body text goes here.</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          ),
        )}
        <MapView
          lat={this.state.lat} lng={this.state.lng}
          getLocations={this.getLocations}
        />
      </div>
    );
  }
}

export default App;
