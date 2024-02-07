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

### Result Object 
The result object contains additional information, including a new field called clearingJWT. This field contains a digitally signed JSON Web Token (JWT) that provides details about the clearing process. To view the contents of the JWT in a human-readable format, copy the value starting with ey... and paste it into the JWT.io debugger at https://jwt.io/.

The result for the first reading will look like:
```javascript
{
  "meterId": "clearingMeter",
  "reading": 1337,
  "endTime": 1707258151431,
  "consumption": 0,
  "co2eq": 0,
  "virtual_0": 0,
  "virtual_1": 0,
  "virtual_2": 0,
  "virtual_3": 0,
  "processed": false,
  "epoch": 474238,
  "clearingTime": 1707265351436,
  "iat": 1707265351,
  "exp": 1707870151,
  "aud": "https://tariff.stadtwerk-musterstadt.de",
  "iss": "Stadtwerk Musterstadt",
  "sub": "EAF"
}
```

The result for the second reading like:
```javascript
{
  "meterId": "clearingMeter",
  "reading": 3337,
  "endTime": 1707261751431,
  "consumption": 2000,
  "co2eq": 143004,
  "virtual_0": 2000,
  "virtual_1": 0,
  "virtual_2": 2000,
  "virtual_3": 0,
  "consumption_virtual_2": 2000,
  "consumption_co2eq": 71502,
  "processed": true,
  "epoch": 474239,
  "clearingTime": 1707265351547,
  "consumption_virtual_1": 0,
  "cost_virtual_1": 0,
  "consumption_fromEpoch": 0,
  "cost_fromEpoch": 0,
  "consumption_fromTime": 0,
  "cost_fromTime": 0,
  "cost_virtual_2": 0.6,
  "consumption_virtual_3": 0,
  "cost_virtual_3": 0,
  "cost": 0.6,
  "iat": 1707265351,
  "exp": 1707870151,
  "aud": "https://tariff.stadtwerk-musterstadt.de",
  "iss": "Stadtwerk Musterstadt",
  "sub": "EAF"
}
```
As the Energy Application Framework has a "delta" a settlement could be done and costs could be applied to the reading. This gets reflected in the clearingJWT with actual values.

**Additional Hints**:

-   The `clearingJWT` field is a critical component of the clearing process. It contains important information such as the meter ID, reading, consumption, cost, and other relevant details.
-   By decoding the `clearingJWT` using the JWT.io debugger, you can gain insights into the clearing process and verify the authenticity and integrity of the data.
-   The JWT.io debugger allows you to view the header, payload, and signature of the JWT, as well as verify the signature using a public key.
-   Understanding the contents of the `clearingJWT` is essential for troubleshooting any issues related to the clearing process and ensuring that the data is accurate and reliable.

### Retrieving Clearances 
The clearing microservice provides a retrieve method that allows you to retrieve all existing clearances for a specific meter. This method can be accessed via a REST API call to the following endpoint:

http://localhost:3000/api/clearing/retrieve?meterId=clearingMeter

In this example, we are using the meter ID clearingMeter. When you make this API call, the clearing.retrieve method will return a list of all clearances that have been performed for the specified meter.

You can use this information to track the clearing history of a particular meter and to identify any potential issues or discrepancies.

Here is an example of the response you might receive from the clearing.retrieve method:

```javascript
[
  {
    "_id": "W2K7EiVKbjQSiVqu",
    "meterId": "clearingMeter",
    "epoch": 474239,
    "reading": 3337,
    "virtual_0": 2000,
    "virtual_1": 0,
    "virtual_2": 2000,
    "virtual_3": 0,
    "startReading": 1337,
    "startTime": 1707258151432,
    "endTime": 1707261751431,
    "consumption_virtual_1": 0,
    "consumption_virtual_2": 2000,
    "consumption_virtual_3": 0,
    "consumption": 2000,
    "cost": 0.6,
    "cost_virtual_1": 0,
    "cost_virtual_2": 0.6,
    "cost_virtual_3": 0,
    "jwt": "eyJ...",
    "co2eq": 143004,
    "consumption_co2eq": 71502
  },
  {
    "_id": "Npdvyi3b0vGsoqG4",
    "meterId": "clearingMeter",
    "epoch": 474238,
    "reading": 1337,
    "virtual_0": 0,
    "virtual_1": 0,
    "virtual_2": 0,
    "virtual_3": 0,
    "endTime": 1707258151431,
    "consumption": 0,
    "jwt": "eyJ...",
    "co2eq": 0,
    "consumption_virtual_1": 0,
    "consumption_virtual_2": 0,
    "consumption_virtual_3": 0
  }
]
```

**Note**: the `clearingJWT` field is called `jwt` as we are using the `clearing` service not the `metering` service as before. 

**Note**: No matter how many meter reading updates the Energy Application Framework receives during an epoch. There will be only one clearing per epoch.

### Clearing JWT as a Verifiable Digital Identity

The Clearing JWT, represented as a JSON Web Token (JWT), serves as a digital identity that provides a signed collection of data about a specific fact or transaction. This digital identity can be likened to a certificate that can be validated by independent parties, ensuring the authenticity and integrity of the data it contains.

To illustrate the practical use of the Clearing JWT as a Clearing Identity, consider the following scenario:

-   A household consumes electricity over a period of time.
-   Two utility companies, Utility A and Utility B, send bills to the household for the same electricity consumption.

In this situation, the household owner can use the Clearing JWT as a verifiable digital identity to prove that the electricity consumption has already been cleared and paid for through Utility A. The Clearing JWT contains information such as the meter ID, reading, consumption, cost, and other relevant details. By presenting the Clearing JWT to Utility B, the household owner can demonstrate that the electricity consumption has been settled and there is no outstanding payment due.

This example showcases the practical application of the Clearing JWT as a Clearing Identity, enabling transparent and verifiable transactions between multiple parties.

**Benefits of Using Clearing JWT as a Clearing Identity:**

-   **Transparency**: The Clearing JWT provides a clear and transparent record of the electricity consumption, cost, and payment status.
-   **Verifiability**: The Clearing JWT can be independently verified by any party, ensuring the authenticity and integrity of the data.
-   **Efficiency**: The Clearing JWT eliminates the need for multiple payments and disputes, streamlining the billing process.
-   **Security**: The Clearing JWT is digitally signed, ensuring the security and privacy of the data it contains.

Overall, the Clearing JWT serves as a valuable tool for establishing a Clearing Identity, facilitating efficient and transparent transactions, and preventing duplicate payments in the energy industry.

## Conclusion 
In this chapter, we explored the concept of clearing within the Energy Application Framework, delving into its significance in the transfer of ownership and introducing the concept of clearings as a "digital identity" represented by a DID document. We also implemented a basic clearing process by simulating two readings and a settlement, examining the result object and the clearingJWT field. Additionally, we discussed the practical use of the Clearing JWT as a Clearing Identity, highlighting its benefits and potential applications in the energy industry.

**Key Takeaways:**

-   **Clearing**: Clearing plays a crucial role in the energy industry, representing the finalization of the transfer of ownership of energy resources. It occurs after the settlement process and establishes a clear record of ownership transfer, ensuring transparency and accountability in the energy market.
    
-   **Clearing Identity**: Clearings can be represented as a "digital identity" associated with a DID document, enabling secure and verifiable ownership transfer, reducing the risk of fraud or manipulation, and providing a standardized framework for recording and tracking clearing transactions via distributed ledger technology.
    
-   **Clearing JWT**: The Clearing JWT is a digitally signed JSON Web Token (JWT) that contains information about the clearing process, including the meter ID, reading, consumption, cost, and other relevant details. It serves as a verifiable digital identity, providing a transparent and tamper-proof record of the cleared transaction.
    
-   **Practical Use of Clearing JWT**: The Clearing JWT can be used as a Clearing Identity to prove that electricity consumption has already been cleared and paid for, preventing duplicate payments and facilitating efficient and transparent transactions between multiple parties in the energy industry.
    

Overall, the Energy Application Framework's incorporation of digital identities for clearings enhances the integrity and reliability of the transfer of ownership within the energy industry, promoting transparency, efficiency, and accountability in energy transactions.

## Next Step: 

`npm start lesson_4`

