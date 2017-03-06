
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
        <div className='header'>
          
          <span className='title'> ATI Tracker</span>


          <span className='balance'>Баланс   2 803 ат.</span>
        </div>
        <Map>
          
        </Map>
   

      </div>
    )
  }
})

export default App;