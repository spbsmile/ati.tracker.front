import fluxxor from 'fluxxor';
import * as stores from '../stores';
import actions from 'app/actions';
import ReactDOM from 'react-dom';
let _flux = null;

const defaultData = {};
function flxInit() {
    if (_flux !== null)
        return _flux;

    let storeInstances = {

    };

    let flux = new fluxxor.Flux(storeInstances, actions);

    flux.setDispatchInterceptor(function (action, dispatch) {
        ReactDOM.unstable_batchedUpdates(function () {
            dispatch(action);
        });
    });


    flux.on('dispatch', function (type, payload) {
        console.log('Dispatch:', type, payload);
    });

    _flux = flux;
    return flux;
}

export default flxInit;