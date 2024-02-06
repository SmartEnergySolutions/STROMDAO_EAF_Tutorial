const EAF = require("stromdao-eaf");
const { exec } = require('child_process'); // Required to open Previews in GitPod Environment

const app = async function() {
    const eaf_node = await EAF.node();

    // Open Preview in Gitpod
    exec('gp preview http://localhost:3000/');
}

app();