const EAF = require("stromdao-eaf");
const lesson = 'lesson_4';

const app = async function() {
    // Create EAF Node 
    const eaf_node = await EAF.node();
    const result = {
        meters:[],
        rules:[]
    };

    // Setup balancing rules:
    // - All meters should balance be aggregated to a group called "DemoBalanceGroup"
    // - balancingMeter0 is a "generation".
    // - balancingMeter1 to balancingMeter3 are "consumption".
    // - balancingMeter4 will get no balancing rule.

    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'balancingMeter0',
        type: 'balance',
        balancerule: {
            to: "DemoBalanceGroup"
        }
    }));
    
    for(let i=1;i<4;i++) {
        result.rules.push(await eaf_node.call("asset.upsert",{
            assetId: 'balancingMeter'+i,
            type: 'balance',
            balancerule: {
                from: "DemoBalanceGroup"
            }
        }));
    }

    // Setup demo meters
    for(let i=0;i<5;i++) {
        result.meters.push(await eaf_node.call("demometer.populate24h",{
            meterId: 'balancingMeter' + i,
            kwha: 1000 + Math.round(Math.random()*5000)
        }));   
    }

    require("./util.js").storeResult(lesson,result);

    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/asset/find?type=balance&md='+lesson);
}

app();