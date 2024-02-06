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

#### Meter Readings via Code

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

Change the meterId from `tutorial1` to `tutorial2` in the `1_updateReading.js` and restart this lesson with `npm start lesson_1`. Validate in the results view at the bottom of this page if the field `meterId` is now changed.

Throughout the tutorial we will use this approach of using small NodeJS scripts to work with the EAF.

#### Meter Readings via REST API
Open a second terminal tab and type in:
```
curl -X POST -d "meterId=Tutorial3&time=1234&reading=4567" "http://localhost:3000/api/metering/updateReading"
```

This will use the REST API to set a meter reading for the meter `Tutorial3`. Refresh the result view below to see if it got listed.

#### Persistence Data
At the moment we do not have a storage (database) defined. So everytime we restart the EAF all data will be lost. This is good for testing. Try it out by switching to the terminal tab which runs this session and restart the lesson. The `meterId` `Tutorial3` should not be in the result list.

#### Result Object
Almost any microservice call returns a result object. So far we ignored this result. 

Insert the following line into the `1_updateReading.js`:
```
   const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
   require("./util.js").storeResult(lesson,result);
```

Restart with `npm start lesson_1`. The Microservice Output card in the results will now present the result of the microservice call.


