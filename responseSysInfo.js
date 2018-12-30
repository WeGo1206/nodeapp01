var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');

module.exports = {
    responseSysInfo: function() {
        
        var htmlTemplateFile;
        var sysInfoFile;
        var singleValue;
        var responseSysInfo;

        htmlTemplateFile = fs.readFileSync('./public/views/info-window.html', 'utf-8');
        sysInfoFile = fs.readFileSync(config.filePathSysInfo, 'utf-8');

        singleValue = sysInfoFile.split(';');

        responseSysInfo = htmlTemplateFile.replace("_SysInfo1", singleValue[0]);
        responseSysInfo = responseSysInfo.replace("_SysInfo2", singleValue[1]);
        responseSysInfo = responseSysInfo.replace("_SysInfo3", singleValue[2]);
        responseSysInfo = responseSysInfo.replace("_SysInfo4", singleValue[3]);
        responseSysInfo = responseSysInfo.replace("_SysInfo5", singleValue[4]);
        responseSysInfo = responseSysInfo.replace("_SysInfo6", singleValue[5]);
        return responseSysInfo;
    }
}

