import * as constants from 'app/constants';
import Fluxxor from 'fluxxor';

let tripInfoPanel = Fluxxor.createStore({

    initialize: function () {
        this.state = {};
        this.setProps({ 'widget_photo_status': "initial"});
         this.setProps({ 'balance': "2 803"});
        
        this.bindActions(
            constants.PHOTO_REQUEST, this.setStatusWait,
            constants.PHOTO_RESPONSE, this.setStatusCanSee
        );
    },

    setStatusCanSee: function (photoUrl){
        this.setProps({ 'widget_photo_status': "can_see_photo", "photoUrl":photoUrl});
    },

    setStatusWait: function (){
        this.setProps({ 'widget_photo_status': "wait_photo_response", "balance":"2 703"});
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


export default tripInfoPanel;