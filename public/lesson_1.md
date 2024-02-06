# Update Meter Reading

## Objective
In this lesson, the objective is to provide a random meter reading to the STROMDAO Energy Application Framework (EAF) and then use the API to view the results.

## Implementation
The actual code required to do this is:
```node
    const EAF = require("stromdao-eaf");
   // Generate first meter reading
    const first_meter_reading = Math.round(Math.random()*10000);

    // Create EAF Node and call metering.updateReading
    const eaf_node = await EAF.node();
    const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
```

### Steps
```
const eaf_node = await EAF.node();
```

This fires up an instance of the Energy Application Framework. So all micro-services get started to allow us to send a meter reading.

```
const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
```

Calling a micro service is done via `eaf_node.call("service.method",{parameters})`. In this case we call the method `updateReading` of a service called `metering`.

The parameters are specific to each method and service. In this case we need:
```
{
    time: TIMESTAMP,
    meterId: "tutorial1",
    reading: first_meter_reading
}
```

Change the meterId from `tutorial1` to `tutorial2` in the `1_updateReading.js` and restart this lesson with `npm start lesson_1`.
