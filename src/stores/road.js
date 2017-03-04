import * as constants from 'app/constants';
import Fluxxor from 'fluxxor';

let road = Fluxxor.createStore({
    initialize: function () {
        this.state = {};
        this.bindActions(
                constants.START_ROAD_LOADED, this.initialRoad
            );
    },

    initialRoad: function (e){
         this.setProps({ 'start_point': e.startPoint, 'end_point': e.endPoint});
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


export default road;