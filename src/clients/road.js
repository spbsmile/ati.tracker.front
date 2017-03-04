import * as server from './server';

export function start(url, {success, error}){
    server.load(url, { success, error } );
}
