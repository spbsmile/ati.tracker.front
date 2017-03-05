import * as constants from 'app/constants';
import Fluxxor from 'fluxxor';

let map = Fluxxor.createStore({
    initialize: function () {
        this.state = {};
        this.bindActions(
                constants.LOAD_PATH_LOADED, this.setLoadPoints
            );
    },

    setLoadPoints: function (points){
        var sortedPoints = points.sort(function(a, b){
            return a.time < b.time;
        });

         this.setProps({ 'points': sortedPoints});
    },

    setProps(obj) {
        this.state = { ...this.state, ...obj };
        this.changed();
    },

    changed() {
        this.emit('change');
    },

    getState: function () {
        return this.state;
    },


});


export default map;