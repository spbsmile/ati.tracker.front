import * as server from './server';

export function reqPhoto(url, {success, error}){
    server.load(url, { success, error } );
}