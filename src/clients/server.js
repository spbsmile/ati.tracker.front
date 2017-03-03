var reqwest = (FRONTEND) ? require('reqwest') : function() {};

export function save(apiUrl, part, obj, {success, error}) {
    reqwest({
        url: apiUrl + part,
        method: 'post',
        type: 'json',
        contentType: 'application/json',
        processData: false,
        crossOrigin: true,
        withCredentials: true,
        data: JSON.stringify(obj),
    }).then((r) => success(r), (err, msg) => error(err, msg));
}

export function upload(apiUrl, part, files, {success, error}) {
    let data = new FormData();
    for (let i = 0; i < files.length; i++)
        data.append('file' + i, files[i].file, files[i].name);
    reqwest({
        url: apiUrl + part,
        method: 'post',
        type: 'json',
        processData: false,
        accept: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        data: data,
    }).then((r) => success(r), (err, msg) => error(err, msg));
}


export function load(apiUrl, part, {success, error}) {
    reqwest({
        url: apiUrl + part,
        method: 'get',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        type: 'json',
    }).then((r) => {
        success(r);
    }, (err, msg) => {
        console.log('error requesting ', apiUrl, part, err, msg);
        if (error) 
            error(err, msg);
    });
}
export function remove(apiUrl, part, {success, error}) {
    reqwest({
        url: apiUrl + part,
        method: 'delete',
        contentType: 'application/json',
        crossOrigin: true,
        withCredentials: true,
        type: 'json',
    }).then((r) => {
        success(r);
    }, (err, msg) => {
        console.log('error requesting ', apiUrl, part, err, msg);
        error(err, msg);
    });
}
