const EAF = require("stromdao-eaf");
const lesson = 'lesson_2';

const app = async function() {
    // Generate test data
    const startingTime = new Date().getTime();
    const endTime = new Date().getTime()+86400000;
    let consumption = Math.round(Math.random()*10000);

    // Create EAF Node and call metering.updateReading
    const eaf_node = await EAF.node();
    const result = {};
    result.call1 = await eaf_node.call("settlement.retrieve",{
        startTime: startingTime,
        endTime: endTime,
        consumption: consumption    
    });
    result.call2 = await eaf_node.call("settlement.retrieve",{
        startTime: startingTime,
        endTime: endTime,
        consumption: Math.round(consumption/2)    
    });
    require("./util.js").storeResult(lesson,result);

    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/tariff/labels/&md='+lesson);
}

app();