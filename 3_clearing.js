const EAF = require("stromdao-eaf");
const lesson = 'lesson_3';

const app = async function() {
    // Create EAF Node 
    const eaf_node = await EAF.node();
    const result = {};

    // Generate test data
    const initialReading = 1337;
    const consumption = 2000;
    const timeReading1 = new Date().getTime()-(2*3600000);
    const timeReading2 = timeReading1 + (1*3600000);

    result.reading1 = await eaf_node.call("metering.updateReading",{
        meterId: 'clearingMeter',
        time: timeReading1,
        reading: initialReading    
    });

    result.reading2 = await eaf_node.call("metering.updateReading",{
        meterId: 'clearingMeter',
        time: timeReading2,
        reading: initialReading + consumption       
    });
    
    result.settlement = await eaf_node.call("settlement.retrieve",{
        startTime: timeReading1,
        endTime: timeReading2,
        consumption: consumption    
    });

    require("./util.js").storeResult(lesson,result);

    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/tariff/labels/&md='+lesson);
}

app();