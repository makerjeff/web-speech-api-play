/**
 * SPARTAN EXPRESS SERVER
 * Created by jefferson.wu on 6/15/16.
 */

/* ============= MODULES ============= */

//EXPRESS BOILERPLATE
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
//EXPRESS BOILERPLATE - END

//COLORS!
var colors = require('colors');

//file system
var fs = require('fs');

/* ============= VARIABLES ============= */
//global app info, should be populated based on file-read.
var appInfo = {
    appName: '',
    title: '',
    version: '',
    author: {
        name: '',
        email: ''
    }
};

// port
var port = process.argv[2];

/* ============= MIDDLEWARE ============= */

//enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// log
app.use(function(req, res, next){
    console.log('%s %s %s %s', req.method, req.url, req.path, colors.yellow( new Date().toString()));
    next();
});

// static files
app.use(express.static(__dirname + '/public/'));

/* ============= ROUTES ============= */
//default route
app.get('/', function(req, res){
    res.type('text/html');
    res.send('<h1>bipidy bopidy boo.</h1>');
});

//simple debug
app.get('/debug/', function(req,res){
    res.type('text/plain');
    res.send('simple debug route working.');
});

//advanced debug
app.get('/debug/:loc', function(req,res){
    var inputMessage = req.params.loc;

    res.type('text/html');
    res.send('Debug route working. <h3> "' + inputMessage + '" </h3>');
    console.log(req.params.loc);
});

//reads the package.json file
app.get('/api/appdata', function(req, res){
    fs.readFile(__dirname + '/package.json', function(err, data){
        if(err) {
            console.error(err);
        } else {
            //'data' object returns a buffer
            //console.log(data.toString());
            res.type('text/plain');
            res.send(data.toString());
            console.log('data sent');
        }
    });
});



//error route
app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/404.html');
});

/* ============= RUNTIME ============= */
grabApplicationInfo('package.json', appInfo);
initServer(port);


/* ============= FUNCTIONS ============= */
function initServer(port) {
    port = port || 3000;

    app.listen(port, function(){
        console.log(appInfo.appName + ' version ' + appInfo.version + ' running on port ' + port + '. ');
    });
}

function grabApplicationInfo(filename, dataObject){
    fs.readFile(__dirname + '/' + filename, function(err,data){
        if(err){
            console.error(err);
        } else {
            var jsonObject = JSON.parse(data);

            console.log(colors.rainbow('app name: ') + jsonObject.name);
            console.log(colors.rainbow('app version: ') + jsonObject.version);
            console.log(colors.rainbow('private? ') + jsonObject.private);

            console.log(colors.rainbow('dependencies: '));
            for (var item in jsonObject.dependencies) {
                console.log('   ' + item);
            }
            //console.log(jsonObject.dependencies);
        }
    });
}
