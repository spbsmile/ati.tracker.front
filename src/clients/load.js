import * as server from './server';

export function getPoints(url, {success, error}){
    server.load(url, { success, error } );
}


