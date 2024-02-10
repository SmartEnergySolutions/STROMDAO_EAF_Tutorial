const EAF = require("stromdao-eaf");
const lesson = 'lesson_5';

const app = async function() {
    // Create EAF Node 
    const eaf_node = await EAF.node();
    const result = {
        meters:[],
        rules:[]
    };

    // Setup balancing rules:
    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'production1',
        type: 'balance',
        balancerule: {
            to: "seller1"
        }
    }));

    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'seller1',
        type: 'balance',
        balancerule: {
            from: "bigbalancer",
            to: "bigbalancer"
        }
    }));

    result.rules.push(await eaf_node.call("contract.add",{
        assetId: "seller1",
        partnerId: "buyer1",
        direction: "to",
        status: "active",
        energy:200,
        load_min:0,
        load_max:20000,
        balanced:0
    }));

    result.rules.push(await eaf_node.call("balancing.addSettlement",{
        meterId: 'production1',
        epoch: 1337,
        consumption: 500,
        label: "virtual_1",
    }));

    result.rules.push(await eaf_node.call("balancing.seal",{
        assetId: 'production1',
        epoch: 1337
    }));

    result.rules.push(await eaf_node.call("balancing.seal",{
        assetId: 'seller1',
        epoch: 1337
    }));
    

    require("./util.js").storeResult(lesson,result);
    // Open Preview in Gitpod
    require("./util.js").openUrl('http://localhost:3000/json.html?url=/api/balancing/latestBalances?assetId=seller1&md='+lesson);
}

app();