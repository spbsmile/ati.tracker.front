import * as constants from 'app/constants';
import * as clients from 'clients/';
import * as settings from './settings';

export default function methods(settings) {
    return {
        load: {
            getReachedPoints: function (param) {
                var loadRequest = param ? param : constants.loadId;
                clients.Load.getPoints("http://ati.prog-pc32:9999/getPoints/" + loadRequest, {
                    success: (e) => {
                        var lastPhotoPoint = null;
                        for (var pointId in e) {
                            if (e.hasOwnProperty(pointId)) {
                                var point = e[pointId];
                                if (point && point.photo) {
                                    lastPhotoPoint = point;
                                    console.log('Photo point found!');
                                }
                            }
                        }
                        if (lastPhotoPoint) {
                            this.dispatch(constants.PHOTO_RESPONSE, lastPhotoPoint.photo);
                        }
                        this.dispatch(constants.LOAD_PATH_LOADED, e);
                    },
                    error: () => this.dispatch(constants.LOAD_PATH_FAILED),
                })
            },
        },
        road:{
            initial: function(param){
                var loadRequest = param ? param : constants.loadId;
                clients.Road.start('http://ati.prog-pc32:9999/getRide/' + loadRequest,{
                    success: (e) => {

                        if(e && e != undefined && e.status == "finished"){
                            this.dispatch(constants.ROAD_FINISHED);
                        }

                        this.dispatch(constants.START_ROAD_LOADED, e);
                    },
                    error: () => this.dispatch(constants.START_ROAD_FAILED),
                })
            }
        },
        tripInfoPanel:{
            initial: function(){
                //  this.dispatch(constants.PHOTO_REQUEST, e);
            },
            reqPhoto:function(param){
                var loadRequest = param ? param : constants.loadId;
                 clients.Photo.reqPhoto('http://ati.prog-pc32:9999/requestPhoto/'+ loadRequest,{
                    success: () => {
                        this.dispatch(constants.PHOTO_REQUEST);
                    },
                    error: () => this.dispatch(constants.PHOTO_REQUEST_FAILED),
                })
            },
            responsePhoto(photoUrl){
                var url = "http://ec43419d.ngrok.io" + photoUrl;
                this.dispatch(constants.PHOTO_RESPONSE, url);
            }
        }
    }
}