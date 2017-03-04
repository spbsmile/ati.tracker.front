import * as constants from 'app/constants';
import * as clients from 'clients/';
import * as settings from './settings';


export default function methods(settings) {
    return {
        load: {
            getReachedPoints: function () {
                clients.Load.getPoints("http://ati.prog-pc32:9999/getPoints/thisisloadid", {
                    success: (e) => {
                        this.dispatch(constants.LOAD_PATH_LOADED, e);
                    },
                    error: () => this.dispatch(constants.LOAD_PATH_FAILED),
                })
            },
        },
        road:{
            initial: function(){
                client.Road.start({
                    success: (e) => {
                        this.dispatch(constants.START_ROAD, e);
                    },
                    error: () => this.dispatch(constants.START_ROAD_FAILED),
                })
            }
        }
    }
}