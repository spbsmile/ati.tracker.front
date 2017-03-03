import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import styles from './style.css';

import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';


let map = React.createClass({

    mixins: [FluxMixin],

    getInitialState: function () {
        return {};
    },

    getStateFromFlux: function () {
        var flux = this.getFlux();
    },

    clickButton() {
        this.getFlux().actions.load.get();
    },

    render: function () {
        const center = [59.938043, 30.337157];
        const greatPlaceCoords = { lat: 59.724465, lng: 30.080121 };
        return (
            <div className="frameGoogleMap">
                <GoogleMap
                    center={center}
                    zoom={9}>
                </GoogleMap>
                <button onClick={this.clickButton}>    </button>
            </div>);
    },
});

export default map;