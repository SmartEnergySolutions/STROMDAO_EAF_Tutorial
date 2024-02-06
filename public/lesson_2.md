# Settlement

## Objective
By the end of this tutorial chapter on "Settlement" in the Energy Application Framework, learners will be able to understand the concept of settlements and how they are implemented using the framework. They will gain knowledge on how to split the consumption delta between different price segments when there are only two [meter readings](?md=lesson_1.md) available, by calculating the average consumption per price segment.

In this lesson, learners will be introduced to the importance of settlements in the energy industry and how they ensure accurate reconciliation of energy transactions. They will explore the role of the settlement microservice in handling complex processes involved in energy settlements, such as calculating imbalances and generating settlement invoices.

To address the scenario of having only two meter readings, learners will understand the need to split the consumption delta between different price segments. The lesson will guide them on how to calculate the average consumption per price segment and distribute the consumption accordingly. This approach provides a simple solution when there are limited meter readings available.

Throughout the tutorial chapter, learners will gain practical knowledge on using the Energy Application Framework to implement settlements. They will learn how to leverage the framework's functionalities to perform calculations, handle imbalances, and generate settlement invoices based on the available meter readings.

## Implementation
Sample code in `2_settlement.js`:
```javascript
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
```

### Steps
This code snippet performs the following actions:


1.  It initializes a variable `startingTime` with the current timestamp using the `getTime()` method of the `Date` object.
2.  It calculates the `endTime` by adding 86400000 milliseconds (equivalent to 24 hours) to the current timestamp.
3.  It generates a random number between 0 and 10000 using the `Math.random()` method and multiplies it by 10000. The result is then rounded using the `Math.round()` method and stored in the `consumption` variable.
4.  It creates an `EAF` node and awaits its initialization.
5.  It defines an empty object `result` to store the results of the microservice calls.
6.  It calls the `settlement.retrieve` microservice on the `eaf_node` with the following parameters:
    -   `startTime`: the value of `startingTime`
    -   `endTime`: the value of `endTime`
    -   `consumption`: the value of `consumption`  
        The result of this call is stored in the `result.call1` property of the `result` object.
7.  It calls the `settlement.retrieve` microservice on the `eaf_node` again with the following parameters:
    -   `startTime`: the value of `startingTime`
    -   `endTime`: the value of `endTime`
    -   `consumption`: half of the value of `consumption`  
        The result of this call is stored in the `result.call2` property of the `result` object.

The purpose of this code snippet is to simulate the retrieval of settlement data for a given consumption value within a specific time range. The `settlement.retrieve` microservice is called twice, once for the original consumption value (`call1`) and once for half of the consumption value (`call2`). The results of these calls are stored in the `result` object for further processing.

### Result Object

The Energy Application Framework provides default price segments and CO2 footprint information for energy consumption. The default settings of the framework include three price segments, referred to as `virtual_1`,`virtual_2`, and `virtual_3` . These segments represent different levels of pricing for energy consumption.

In addition to the price segments, the framework also provides information on the CO2 footprint of the total energy consumption. The CO2 footprint represents the amount of CO2 emissions associated with the energy consumed. The CO2 footprint is calculated based on the data provided by the original dynamic segment/tariff data source.

```javascript
{
  "call1": {
    "virtual_2":5090,"virtual_3":1175,"virtual_1":3133,"co2eq":287777
  },
 "call2": {
    "virtual_2":2545,"virtual_3":587,"virtual_1":1566,"co2eq":143889
  }
}
```

In the code snippets result, we have two calls, `call1` and `call2`. Each call provides values for the virtual meters, including `virtual_1`, `virtual_2`, and `virtual_3`. These virtual meters represent the default price segments in the Energy Application Framework. Additionally, the result includes the CO2 footprint, represented by the `co2eq` field, which indicates the total CO2 emissions associated with the energy consumption

### Understanding Settlements

In the Energy Application Framework, settlements are an important aspect of managing energy consumption and pricing. When analyzing settlements, it is crucial to consider the default settings of the framework, as they can affect the results obtained.

Consumption Discrepancies:
In some cases, when comparing settlements, the consumption values may not be exactly half of the previous values. This discrepancy can be attributed to the first and last hour of the settlement period.

Hourly Price Variations:
The default settings of the Energy Application Framework include varying prices for each hour. This means that the prices can differ from hour to hour throughout the settlement period.

Partial Handling of Time:
When using the current time plus 24 hours as the timeframe for the settlement, it is important to handle the minutes until the start of the first full hour and the time from the last full hour until the end time partially. This partial handling ensures accurate calculations and avoids any inconsistencies in the settlement results.

#### Dynamic Segments (labels)
The `settlement.retrieve` function calls the tariff.labels to retrieve the source data for energy consumption settlement. This process is crucial for accurately calculating and settling the energy consumption within a specific timeframe.

Microservice call: `eaf_node.call("tariff.labels")`


The result from the REST API endpoint `http://localhost:3000/api/tariff/labels/` is an array that contains information about different timeframes and their corresponding segments. Each element in the array represents a timeframe, referred to as an epoch, and includes the following properties:

-   `epoch`: This property represents the epoch number for the timeframe.
-   `label`: The `label` property indicates the segment associated with the epoch. The segments are named `virtual_1` to `virtual_X`, depending on the number of segments configured in the system, with a default value of 3.
-   `co2eq`: The `co2eq` property represents the carbon dioxide equivalent value for the epoch, indicating the amount of carbon dioxide emissions associated with that timeframe.
-   `time`: The `time` property represents the timestamp for the epoch in milliseconds.

The result array provides information about the segments and their corresponding carbon dioxide equivalent values for different timeframes.
```javascript
[
    {
        "epoch": 474238,
        "label": "virtual_2",
        "co2eq": 35,
        "time": 1707256800000
    },
    {
        "epoch": 474239,
        "label": "virtual_2",
        "co2eq": 37,
        "time": 1707260400000
    },
...
]
```

## Conclusion 
Settlements play a crucial role in the Energy Application Framework, particularly in the distribution and pricing of energy consumption. They are an important component in various processes within the energy industry. One way to understand their role is through the concept of delta settlement, which involves dividing the consumption between two meter readings into smaller increments with different prices. Typically, settlements are conducted prior to the clearing of the consumption.

In the context of electricity settlement reform, the reconciliation of differences between a supplier's contractual purchases of electricity and the demand of its customers is essential. Settlements ensure that generators and suppliers can effectively trade electricity in the wholesale market, while also accurately accounting for customer usage. The introduction of smart meters has further enhanced the settlement process by providing more accurate and timely data on energy consumption.

Overall, settlements are integral to the Energy Application Framework as they facilitate the efficient distribution and pricing of energy consumption. They contribute to the development of sustainable applications and support the transition towards a smarter and more flexible energy system.

