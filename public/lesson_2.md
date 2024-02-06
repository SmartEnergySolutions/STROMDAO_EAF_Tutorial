# Settlement

## Objective
By the end of this tutorial chapter on "Settlement" in the Energy Application Framework, learners will be able to understand the concept of settlements and how they are implemented using the framework. They will gain knowledge on how to split the consumption delta between different price segments when there are only two [meter readings](?md=lesson_1.md) available, by calculating the average consumption per price segment.

In this lesson, learners will be introduced to the importance of settlements in the energy industry and how they ensure accurate reconciliation of energy transactions. They will explore the role of the settlement microservice in handling complex processes involved in energy settlements, such as calculating imbalances and generating settlement invoices.

To address the scenario of having only two meter readings, learners will understand the need to split the consumption delta between different price segments. The lesson will guide them on how to calculate the average consumption per price segment and distribute the consumption accordingly. This approach provides a simple solution when there are limited meter readings available.

Throughout the tutorial chapter, learners will gain practical knowledge on using the Energy Application Framework to implement settlements. They will learn how to leverage the framework's functionalities to perform calculations, handle imbalances, and generate settlement invoices based on the available meter readings.

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
