const EAF = require("stromdao-eaf");
const lesson = 'lesson_2';

const app = async function() {
    // Generate test data
    const startingTime = new Date().getTime() - 86400000;
    const endTime = new Date().getTime();
    const consumption = Math.round(Math.random()*10000);

    // Create EAF Node and call metering.updateReading
    const eaf_node = await EAF.node();
    const result = await eaf_node.call("settlement.retrieve",{
        startTime: startingTime,
        endTime: endTime,
        consumption: consumption    
    });
    require("./util.js").storeResult(result);

    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/readings_model/&md='+lesson);
}

app();