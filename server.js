var express = require("express");
var app     = express();
var path    = require("path");
var ejs = require('ejs');
var fileUpload = require('express-fileupload');


app.use(fileUpload());
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('index');
});

app.post('/upload', function(req, res) {
    var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.sampleFile;
    sampleFile.mv('filename.jpg', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});

var port = process.env.PORT || 8080;

app.listen(port);
