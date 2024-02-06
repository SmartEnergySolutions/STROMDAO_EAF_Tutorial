
module.exports = {
    openUrl:function(url) {
        if(typeof process.env.GITPOD_HOST !== 'undefined') {
            const { exec } = require('child_process'); // Required to open Previews in GitPod Environment
            exec('gp preview "'+url+'"');
        } else {
            const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
            require('child_process').exec(start + ' ' + url);
        }
    },
    openCode:function(url) {
        if(typeof process.env.GITPOD_HOST !== 'undefined') {
            const { exec } = require('child_process'); // Required to open Previews in GitPod Environment
            exec('gp open '+url);
        } else {
            console.log("Open in Editor:",url);
        }
    }

}