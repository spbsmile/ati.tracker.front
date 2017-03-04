import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import styles from './style.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';
import RoadPoint from './road_point.js';

let map = React.createClass({

    mixins: [FluxMixin,
        storeWatch('map', 'road'),
        PureRenderMixin],

    getInitialState: function () {
        this.getFlux().actions.load.getReachedPoints();
        this.getFlux().actions.road.initial();
        return {};
    },
  
    getStateFromFlux: function () {
        const map = this.getFlux().store('map').getState();
        const road = this.getFlux().store('road').getState();
        return {map, road};
    },

    getWrapReachedPoints() {
        const points = this.state.map.points;
        if (points) {
            let loadPoints = [];
            for (var i = 0; i < points.length; i++) {
                if (points[i].photo) {
                    var point = points[i];
                    loadPoints.push(<MyGreatPlace key={i} lat={point.lat} lng={point.lon} />);
                }
            }
            return loadPoints;
        }
    },

    showRoadBound(){
        const road = this.state.road;
        return [<MyGreatPlace key={"start_point"} lat={road.start_point.lat} lng={road.start_point.lon} />,
        <MyGreatPlace key={"end_point"} lat={road.end_point.lat} lng={road.end_point.lon} />
        ];
    },

    mapLoaded() {
        const reachedPoints = this.state.map.points;

        let wrapPoints = reachedPoints.map(function(point){
            return {lat: parseFloat(point.lat), lng: parseFloat(point.lon)}
        })

        var roadPath = new google.maps.Polyline({
            path: wrapPoints,
            geodesic: true,
            strokeColor: '#69cd23',
            strokeOpacity: 1.0,
            strokeWeight: 5
        });

        roadPath.setMap(this.map.map_);
    },

    render: function () {
        const loadsPoint = this.getWrapReachedPoints();
        const road = this.showRoadBound();

        const reachedPoints = this.state.points;
        const center = [59.938043, 30.337157];
        return (
            <div className="frameGoogleMap">
                <GoogleMap
                    yesIWantToUseGoogleMapApiInternals = {true}
                    onGoogleApiLoaded  = {this.mapLoaded}
                    ref ={(map) => { this.map = map; }}
                    center={center}
                    zoom={9}>
                    {loadsPoint}
                    {road}
                </GoogleMap>
            </div>);
    },
});

export default map;