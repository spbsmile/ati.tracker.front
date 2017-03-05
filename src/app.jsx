
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
import Map from './components/Map';

import styles from './styles.css';

const App = React.createClass({

  mixins: [FluxMixin],

  render() {
    return (
      <div className="app-container">
        <div className='header'>ATI Tracker</div>
        <Map>
          
        </Map>
   

      </div>
    )
  }
})

export default App;