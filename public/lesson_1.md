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

#### Working with Results
Almost any microservice call returns a result object. So far we ignored this result. 

Insert the following line into the `1_updateReading.js`:
```
   const result = await eaf_node.call("metering.updateReading",{time:new Date().getTime(),meterId:"tutorial1",reading:first_meter_reading});
   require("./util.js").storeResult(lesson,result);
```

Restart with `npm start lesson_1`. The Microservice Output card in the results will now present the result of the microservice call.

The other results we have seen above is actually the call to another Microservice that returns a list of all readings EAF knows. It is called directly from within the browser. The service is called `readings_model.list` - as `.list` is somehow a special method for data lists with a shortcut in the REST API. `http://localhost:3000/api/readings_model/` gives the same result as `await eaf_node.call("readings_model.list")`.

#### Result of updateReading
We will now have a deeper look at what the `metering.updateReading` call has in its result object:
```json
{
    "meterId": "tutorial1",
    "reading": 4237,
    "time": 1707229796835,
    "co2eq": 0,
    "virtual_0": 0,
    "virtual_1": 0,
    "virtual_2": 0,
    "virtual_3": 0,
    "processed": true,
    "consumption": 0,
    "endTime": 1707229796835,
    "clearingJWT": "ey...."
}
```

- `meterId`: reflects the meterId of this update call.
- `reading`: Meter Reading as given, or last processed
- `time`: Time in milliseconds of the reading.
- `co2eq`: If a settlement could be made, this will be the co2 emission for a consumption (or in case of generation the co2 saving).
- `virtual_0` to `virtual_X`: EAF automatically creates virtual sub-meters. In case of a settlement those are the virtual meter readings in Wh. While `virtual_0` is the total metered energy since this meter exists in EAF.
- `processed`: Indicate if the Meter Reading could been processed (for settlement, debit, etc...)
- `consumption`: Since previous Meter Reading.
- `clearingJWT`: A signed JSON WebToken a third party may use to prove transmission of readings.  

#### Hints for `metering.updateReading`
- If `processed: false` a property "debug" exists in the result object giving you a hint why processing was not done.
- Typical causes are: 
 - To frequent reading updated
 - Reading lower than previous reading
 - Downstream processing would fail (for example no dynamic price information available)

## Conclusion 
In conclusion, this lesson provided an overview of how to update meter readings using the STROMDAO Energy Application Framework (EAF). The objective was to provide a random meter reading and view the results using the EAF API. The implementation involved generating a meter reading, creating an EAF node, and calling the `metering.updateReading` method with the necessary parameters.

The lesson covered two approaches for updating meter readings: via code and via the REST API. The code approach involved using the EAF node to call the `metering.updateReading` method, while the REST API approach used a curl command to set a meter reading.

It was mentioned that at the moment, there is no defined storage (database), so all data will be lost upon restarting the EAF. This is beneficial for testing purposes.

The lesson also highlighted the importance of working with results. Most microservice calls return a result object, which can be stored and utilized. The lesson demonstrated how to store the result of the `metering.updateReading` call and view it in the Microservice Output card.

The result of the `metering.updateReading` call was explained in detail. The result object includes information such as the meterId, reading, time, CO2 emissions, virtual sub-meter readings, processed status, consumption since the previous reading, and a clearing JWT.

For the `metering.updateReading` call, it was mentioned that if the processed status is false, a "debug" property exists in the result object, providing a hint as to why processing was not done. Typical causes include frequent reading updates, readings lower than the previous reading, and the unavailability of dynamic price information.

## Next Step 
[Settlement microservices](https://energy.js.org/docs/service_settlement.html) play a crucial role in the energy industry, enabling efficient and accurate reconciliation of energy transactions between suppliers, generators, and customers. These microservices are responsible for handling the complex processes involved in energy settlements, ensuring that the energy purchased from generators matches the energy sold to customers. 

`npm start lesson_2`




