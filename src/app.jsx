
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Map from './components/Map';

import styles from './styles.css';

const App = React.createClass({

    mixins: [FluxMixin,
        storeWatch('tripInfoPanel'),
        PureRenderMixin],

    getInitialState: function () {
        return {};
    },

    getStateFromFlux: function () {
        return this.getFlux().store('tripInfoPanel').getState();
    },

    showBalance() {
      let balanceValue = "";
      if(this.state.balance != undefined){
          balanceValue = this.state.balance;
      }else{
        balanceValue = "2 803";
      }
       return <div>
            <span>{"Баланс"} </span><span>{balanceValue}</span> <span>{"ат."}</span>
        </div>;
    },

  render() {
    
    return (
      <div className="app-container">
        <div className='header'>
          <span className='title'> ATI Tracker</span>

          <span className='balance'>{this.showBalance()}</span>
        </div>
        <Map>
          
        </Map>
      </div>
    )
  }
})

export default App;