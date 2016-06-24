/** Promisified XHR GET request
 * Created by jefferson.wu on 6/24/16.
 */

function get(url) {
    //return a new promise
    return new Promise(function(resolve, reject){

        var oReq = new XMLHttpRequest();
        oReq.open('GET', url);

        //progress event
        oReq.addEventListener('progress', function(oEvent){
            if(oEvent.lengthComputable){
                var percentageComplete = oEvent.loaded / oEvent.total;
                console.log((percentageComplete * 100).toFixed(2) + '%');
            } else {
                console.log('size unknown');
            }
        });

        //complete event
        oReq.addEventListener('load', function(e){

            //if everything went right, resolve with response.
            if(oReq.status == 200) {
                resolve(oReq.response);
            } else {
                reject(Error(oReq.statusText));
            }
        });

        //error event
        oReq.addEventListener('error', function(e){
            reject(Error('error loading file. ' + e));
        });

        //abort event
        oReq.addEventListener('abort', function(e){
            reject(Error('manual abortion.'));
        });

        //finally, send the request.
        oReq.send();
    });
}