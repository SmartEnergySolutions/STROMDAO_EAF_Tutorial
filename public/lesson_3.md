# Clearing - The Transfer of Ownership

## Objective
Clearing plays a crucial role in the energy industry as it represents the actual "transfer of ownership" of energy resources. It is an immutable step that follows the settlement process, which provides the figures or amounts that can be cleared. In this chapter, we will delve into the concept of clearing within the Energy Application Framework, exploring its significance in the transfer of ownership and introducing the concept of clearings as a "digital identity" represented by a DID (Decentralized Identifier) document.

### Role of Clearing
- Clearing in the energy industry refers to the process of finalizing the transfer of ownership of energy resources, such as electricity or natural gas. It occurs after the settlement process, which determines the financial aspects of the transaction
-  Clearing represents the point in time when the actual price is added to the exchanged energy resource. Once the clearing process is complete, there will be no further changes in settlement, pricing, or other values related to the energy transaction 
-  Clearing ensures transparency and accountability in the energy market by establishing a clear record of ownership transfer. It provides certainty to both buyers and sellers, facilitating efficient and reliable energy transactions

### Clearing Identity
- In the context of clearing, the concept of clearings can be represented as a "digital identity." This digital identity can be associated with a DID document, which serves as a unique identifier for the clearing process
- Using a digital identity for clearings offers several advantages. It enables secure and verifiable ownership transfer, reduces the risk of fraud or manipulation, and provides a standardized framework for recording and tracking clearing transactions via ditributed ledger technology
- The Energy Application Framework incorporates the use of digital identities for clearings, ensuring the integrity and reliability of the transfer of ownership within the energy industry. This framework leverages decentralized technologies to enhance transparency and efficiency in clearing processes

## Implementation
Sample code in `3_clearing.js`:
```javascript
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
```

### Steps
This code snippet is demonstrating a basic clearing process by simulating two readings and a settlement.

1.  **Generate Test Data**:
    -   `initialReading`: Represents the initial reading of the meter.
    -   `consumption`: Represents the amount of consumption that occurred between the two readings.
    -   `timeReading1` and `timeReading2`: These are timestamps representing the times of the two readings. `timeReading1` is set to the current time minus 2 hours, and `timeReading2` is set to `timeReading1` plus 1 hour.

2.  **Update Reading 1**:
    -   The first reading is updated using the `metering.updateReading` microservice call.
    -   The meter ID is set to `clearingMeter`, the time is set to `timeReading1`, and the reading is set to `initialReading`.
    -   The result of this call is stored in the `result.reading1` property.

3.  **Update Reading 2**:
    -   The second reading is updated using the `metering.updateReading` microservice call.
    -   The meter ID is still set to `clearingMeter`, but the time is now set to `timeReading2`, and the reading is set to `initialReading + consumption`.
    -   The result of this call is stored in the `result.reading2` property.

4.  **Retrieve Settlement**:
    -   The `settlement.retrieve` microservice call is used to retrieve the settlement information for the given time period.
    -   The start time is set to `timeReading1`, the end time is set to `timeReading2`, and the consumption is set to `consumption`.
    -   The result of this call is stored in the `result.settlement` property.

This code snippet essentially simulates a clearing process by creating two readings and then retrieving the settlement information for the time period between those readings. 


## Conclusion 


## Next Step: 

`npm start lesson_4`

