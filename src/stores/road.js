import * as constants from 'app/constants';
import Fluxxor from 'fluxxor';

let road = Fluxxor.createStore({
    initialize: function () {
        this.state = {};
        this.bindActions(
                constants.START_ROAD_LOADED, this.initialRoad
            );
    },

    initialRoad: function (start_point, end_point){
         this.setProps({ 'start_point': start_point, 'end_point': end_point});
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