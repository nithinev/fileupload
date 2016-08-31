var express = require("express");
var app     = express();
var path    = require("path");
var ejs = require('ejs');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var xml2js = require('xml2js');

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
    var path = req.files.sampleFile.path;
    var name = req.files.sampleFile.name;
    console.log(path+"="+name);	
    sampleFile.mv(name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            fs.readFile(name, 'utf8', function(err, contents) {
		console.log(contents);
			var xml = contents;
			var parser = new xml2js.Parser();
			parser.parseString(xml, function(err,result){
			  //Extract the value from the data element
			  //extractedData = result['opml']['body']['outline'];
			  var title = result.opml.body[0].outline[0].$.title;
			  var url = result.opml.body[0].outline[0].$.htmlUrl;			
			  		
			  fs.unlinkSync(name);
			});
	    });
		console.log('after calling readFile');	
	    }
        });
});
    
	

var port = process.env.PORT || 8080;

app.listen(port);
