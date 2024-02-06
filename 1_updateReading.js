const EAF = require("stromdao-eaf");
const lesson = 'lesson_1';

const app = async function() {
    // Generate first meter reading
    const first_meter_reading = Math.round(Math.random()*10000);

    // Create EAF Node and call metering.updateReading
    const eaf_node = await EAF.node();
    const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
 
    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/readings_model/&md='+lesson);
}

app();