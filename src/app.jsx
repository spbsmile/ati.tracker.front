
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
import Map from './components/Map';
import RequestPhotoPanel from './components/RequestPhotoPanel';

const App = React.createClass({

  mixins: [FluxMixin],

  render() {
    return (
      <div className="app-container">
        <div> Привет мир!! </div>
        <Map></Map>
        <RequestPhotoPanel/>

      </div>
    )
  }
})

export default App;