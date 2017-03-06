
import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Map from './components/Map';

import styles from './styles.css';

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
    var loadId = getParameterByName('loadId', window.location.search);
    console.log(loadId);
    return (
      <div className="app-container">
        <div className='header'>
          <span className='title'> ATI Tracker</span>

          <span className='balance'>{this.showBalance()}</span>
        </div>
        <Map loadId={loadId}>
          
        </Map>
      </div>
    )
  }
})

export default App;