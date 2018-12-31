var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');


module.exports = {
    readActValues: function() {
        
        var actValues;
         
        var newActValues = fs.readFileSync(config.filePathActValue, 'utf-8');

        actValues = newActValues.split(';');

        return actValues;
    
    }
}

