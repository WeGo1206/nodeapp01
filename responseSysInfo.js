var fs = require('fs');
var moment = require('moment');

module.exports = {
    responseSysInfo: function() {
        
        var htmlTemplateFile;
        var sysInfoFile;
        var singleValue;
        var responseSysInfo;

        htmlTemplateFile = fs.readFileSync('./public/views/info-window.html', 'utf-8');
        sysInfoFile = fs.readFileSync('/home/pi/Documents/PiSysInfo.txt', 'utf-8');

        singleValue = sysInfoFile.split(';');

        responseSysInfo = htmlTemplateFile.replace("_SysInfo1", singleValue[1]);
        responseSysInfo = responseSysInfo.replace("_SysInfo2", singleValue[2]);
        responseSysInfo = responseSysInfo.replace("_SysInfo3", singleValue[4]);
        responseSysInfo = responseSysInfo.replace("_SysInfo4", singleValue[5]);
        
        return responseSysInfo;
    }
}

