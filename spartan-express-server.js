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
});

// 


/* ============= ROUTES ============= */
//default route
app.get('/', function(req, res){
    res.type('text/html');
    res.send('')
});
