var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');

module.exports = {
    responseLogin: function() {
        
        var htmlTemplateFile;


        htmlTemplateFile = fs.readFileSync('./public/views/login.html', 'utf-8');
        
        return htmlTemplateFile;
    }
}

