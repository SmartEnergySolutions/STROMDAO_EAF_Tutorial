const EAF = require("stromdao-eaf");
const { exec } = require('child_process'); // Required to open Previews in GitPod Environment

const app = async function() {
    // Generate first meter reading
    const first_meter_reading = Math.round(Math.random()*10000);

    // Create EAF Node and call metering.updateReading
    const eaf_node = await EAF.node();
    const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
    
    // Open Preview in Gitpod
    exec('gp preview http://localhost:3000/json.html?url=/api/readings_model/');
}

app();