const EAF = require("stromdao-eaf");
const fs = require("fs");

const welcome = async function() {
    const eaf_node = await EAF.node();

    // Open Preview 
    require("./util.js").openUrl('http://localhost:3000/');

}
if(process.argv.length > 2) {
    let lessons = JSON.parse(fs.readFileSync("lessons.json"));
    if(typeof lessons[process.argv[2]] !== 'undefined') {
        const { exec } = require('child_process'); // Required to open Previews in GitPod Environment
        exec('node '+lessons[process.argv[2]].script);
        require("./util.js").openCode(lessons[process.argv[2]].script);
    }       
} else {
    welcome();
}
