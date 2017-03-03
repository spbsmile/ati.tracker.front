import * as constans from 'app/constants';
import Fluxxor from 'fluxxor';

let map = Fluxxor.createStore({
    initialize: function () {
        this.state = {};
        this.bindActions(
            
            );
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