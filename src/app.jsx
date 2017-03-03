
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
import Map from './components/Map';


const App = React.createClass({

  mixins: [FluxMixin],

  render() {
    return (
      <div className="app-container">
        <div> Привет мир!! </div>
        <Map></Map>
        

      </div>
    )
  }
})

export default App;