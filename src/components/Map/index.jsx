import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import styles from './style.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';

let map = React.createClass({

    mixins: [FluxMixin,
        storeWatch('map'),
        PureRenderMixin],

    getInitialState: function () {
        this.getFlux().actions.load.getReachedPoints();
        return {};
    },

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return flux.store('map').getState();
    },

    showPoints() {
        const points = this.state.points;
        if (points) {
            let loadPoints = [];
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                loadPoints.push(<MyGreatPlace lat={point.lat} lng={point.lon} />);
            }
            return loadPoints;
        }
    },

    render: function () {
        const loadsPoint = this.showPoints();
        const center = [59.938043, 30.337157];
        return (
            <div className="frameGoogleMap">
                <GoogleMap
                    center={center}
                    zoom={9}>
                    {loadsPoint}
                </GoogleMap>
            </div>);
    },
});

export default map;