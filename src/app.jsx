
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
import Map from './components/Map';
import TripInfoPanel from './components/TripInfoPanel';

const App = React.createClass({

  mixins: [FluxMixin],

  render() {
    return (
      <div className="app-container">
        <div>ATI Tracker</div>
        <Map></Map>
        <TripInfoPanel/>

      </div>
    )
  }
})

export default App;