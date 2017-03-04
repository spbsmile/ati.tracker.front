import React from 'react';
import Fluxxor from 'fluxxor';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;
import styles from './style.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';
import RoadPoint from './roadPoint.jsx';
import TruckPoint from './truckPoint.jsx';

let map = React.createClass({

    mixins: [FluxMixin,
        storeWatch('map', 'road'),
        PureRenderMixin],

    getInitialState: function () {
        this.getFlux().actions.load.getReachedPoints();
        this.getFlux().actions.road.initial();

        var flux = this.getFlux();
        setInterval(function(){
            flux.actions.load.getReachedPoints();
        }, 2000);

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
            var time = 0;
            var truckPoint = null;

            let loadPoints = [];
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                if (point.photo) {
                    loadPoints.push(<MyGreatPlace key={i} lat={point.lat} lng={point.lon} />);
                }

                if (point.time > time) {
                    truckPoint = point;
                }
            }

            if (truckPoint) {
                loadPoints.push(<TruckPoint key={i} lat={truckPoint.lat} lng={truckPoint.lon} />);
            }
            return loadPoints;
        }
    },

    showRoadBound(){
        const road = this.state.road;
        const points = this.state.map.points;

        if (road && road.start_point && road.end_point) {
            
            return [
                <RoadPoint key={"start_point"} lat={road.start_point.lat} lng={road.start_point.lon} />,
                <RoadPoint key={"end_point"} lat={road.end_point.lat} lng={road.end_point.lon} />
            ];
        } else {
            return [];
        }
    },

    mapLoaded() {
        const reachedPoints = this.state.map.points;
        const road = this.state.road;

        this.drawLine(reachedPoints, this.map.map_);
        this.drawLoadPath(road, this.map.map_);

    },

    drawLoadPath(road, map) {
        let pathPoints = [
            {lat: parseFloat(road.start_point.lat), lng: parseFloat(road.start_point.lon)},
            {lat: parseFloat(road.end_point.lat), lng: parseFloat(road.end_point.lon)},
        ]

        var roadPath = new google.maps.Polyline({
            path: pathPoints,
            geodesic: true,
            strokeColor: '#6A7175',
            strokeOpacity: 0.5,
            strokeWeight: 5,
            zIndex: 1,
            'z-Index': 1
        });

        roadPath.setMap(map);    
    },

    drawLine(points, map) {
        let wrapPoints = points.map(function(point){
            return {lat: parseFloat(point.lat), lng: parseFloat(point.lon)}
        })

        var roadPath = new google.maps.Polyline({
            path: wrapPoints,
            geodesic: true,
            strokeColor: '#69cd23',
            strokeOpacity: 1.0,
            strokeWeight: 5,
            zIndex: 4,
            'z-index': 4
        });

        roadPath.setMap(map);
    },

    getCenter() {
        const road = this.state.road;

        if (road && road.start_point && road.end_point) {
            return [(road.start_point.lat + road.end_point.lat / 2), (road.start_point.lon + road.end_point.lon / 2)]
        } else {
            return [59.938043, 30.337157];
        }
    },

    render: function () {
        const loadsPoint = this.getWrapReachedPoints();
        const road = this.showRoadBound();

        const reachedPoints = this.state.points;
        const center = this.getCenter();

        if (this.map && this.map.map_) {
            this.mapLoaded();
        }

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