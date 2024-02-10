# Energy Balancing (Part 2)

## Objective
In this lesson, our objective is to delve into the complexities of energy trading within the Energy Application Framework (EAF) and understand the mechanisms used to ensure accurate energy balancing without direct physical validation. As we move away from the simplicity of validating energy transactions via metered data, we encounter the challenge of achieving consensus on power transactions that occur beyond the physically observable grid, such as those mediated through exchanges or third-party arrangements. The lesson will cover the key concepts and tools that facilitate trust and validation in such scenarios, illustrating how these mechanisms are crucial for maintaining a reliable and consistent energy balance within the digital infrastructure of the EAF.

## Implementation Balancing Part 2
Sample code in `5_balancing.js`:
```javascript
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
```

### Steps
In the context of the STROMDAO Energy Application Framework (EAF), peer-to-peer electricity trading involves various components of the EAF API. The process includes defining fundamental balancing rules, establishing contracts, and sealing balances for designated accounting periods. It encompasses creating and configuring energy production units, defining trading rules between participants, and finalizing balances to verify transactions.

Here are the steps of the example in detail:

1.  **Balancing Rules for the Production Unit:**
    -   A rule is set up to assign the electricity production unit, `production1`, to the seller `seller1`. This ensures that the electricity produced is credited to `seller1`'s balance.

```javascript
    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'production1',
        type: 'balance',
        balancerule: {
            to: "seller1"
        }
    }));
```

2.  **Rule to Maintain Balance:**  
    -   `seller1` acts as a balancing point by delivering electricity to and from `bigbalancer`. Each balancing point must be balanced at each billing period to be settled validly.

```javascript
    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'seller1',
        type: 'balance',
        balancerule: {
            from: "bigbalancer",
            to: "bigbalancer"
        }
    }));
```

3.  **Definition of the Power Purchase Agreement:**  
    -   An electricity supply contract between the seller and buyer is defined. `seller1` commits to delivering a specific amount of electricity to `buyer1`.

```javascript
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
```

4.  **Registration of Electricity Generation:**
    -   The production meter `production1` records a generation of electricity for a defined epoch.

```javascript
    result.rules.push(await eaf_node.call("balancing.addSettlement",{
        meterId: 'production1',
        epoch: 1337,
        consumption: 500,
        label: "virtual_1",
    }));
```

5.  **Sealing the Balances:**
    -   The balances for `production1` and `seller1` are sealed for the relevant epoch, ensuring no retrospective changes and finalizing the settlement.

```javascript
    result.rules.push(await eaf_node.call("balancing.seal",{
        assetId: 'production1',
        epoch: 1337
    }));

    result.rules.push(await eaf_node.call("balancing.seal",{
        assetId: 'seller1',
        epoch: 1337
    }));
```

This approach enables verifiable and immutable transactions within a decentralized, digital marketplace for electricity trading. It contributes to making peer-to-peer energy trading transparent, secure, and efficient.


## Power Purchase Agreements (PPA)

A PPA is a contract between two parties, typically a seller (electricity producer) and a buyer (electricity consumer), that specifies the terms of electricity purchase and sale. In the EAF, PPAs can be created and managed using the EAF API.

### Example (from source)
Consider a simple PPA between `seller1` and `buyer1`, where `seller1` commits to delivering 200 units of electricity to `buyer1` per epoch, until the contract is canceled.

### Processing
The EAF processes metered values first, before applying contracts. This ensures that the actual electricity generation and consumption are taken into account before applying the PPA.

### Example Transactions at the end
1.  `production1` delivers 500 units to `seller1`.
2.  `seller1` delivers 500 units to `bigbalancer`.
3.  `seller1` delivers 200 units to `buyer1`.
4.  `bigbalancer` delivers 200 units to `seller1`.

### Significance of Last Two Transactions
The last two transactions ensure that the balance of `bigbalancer` remains unchanged by the exchange between `seller1` and `buyer1`. This is important for maintaining the overall balance of the system.

### Conclusion
PPAs in the EAF enable flexible and verifiable electricity trading arrangements between parties. The EAF's processing logic ensures that metered values are prioritized, while also honoring the terms of PPAs. This contributes to a transparent and efficient peer-to-peer energy trading marketplace.

## Merit Order List
The merit order list is a ranked list of PPAs, based on their priority. The EAF uses this list to determine which PPAs to apply first when sealing a balance for a balancing point.

### Microservice: `meritorder`
The `meritorder` microservice is responsible for managing the merit order list. It provides an API for adding, removing, and modifying PPAs on the list.

### EAF Processing
When sealing a balance for a balancing point, the EAF calls the `meritorder` microservice to retrieve the current merit order list. The EAF then applies the PPAs on the list, in order of priority, until the balance is fully settled.

### Example
Consider a balancing point with three PPAs:

1.  PPA1: `seller1` to `buyer1`, priority 1
2.  PPA2: `seller1` to `buyer2`, priority 2
3.  PPA3: `seller1` to `buyer3`, priority 3

When sealing the balance for this balancing point, the EAF will first apply PPA1, then PPA2, and finally PPA3. This ensures that the highest priority PPAs are fulfilled first.

The merit order list, managed by the `meritorder` microservice, enables the EAF to prioritize PPAs based on their importance. This ensures that the most critical contracts are fulfilled first, contributing to a fair and efficient peer-to-peer energy trading marketplace.

## Conclusion
This lesson emphasized the pivotal role of meticulous balancing within the Energy Application Framework (EAF). We learned that the EAF's balancing mechanisms are integral to ensuring that electricity transactions are thoroughly accounted for, facilitating operation even when direct physical validation isn't possible. This precision in balancing safeguards the system's integrity and reliability, which are fundamental to the trust stakeholders place in the energy trading system.

Moreover, the session highlighted how contracting within the framework is optimized through the utilization of a merit order list. By prioritizing power purchase agreements (PPAs) according to their significance and urgency, the EAF ensures that the most crucial contracts are serviced preferentially. This ordering is not simply a matter of administrative convenience but a deliberate approach to preserve fairness and efficiency in the marketplace. Prioritization thus emerges as a critical component for stabilizing supply-demand equilibrium and maintaining a balanced and just energy trading environment.

Overall, the insights from the training session are invaluable for entities engaged in energy trading, demonstrating that accurate balancing and contract prioritization are the cornerstones of a robust and equitable energy market. It underlines the necessity to adopt sophisticated systems that can manage these aspects effectively, ensuring that as the energy market evolves, it does so on a foundation of transparency and operational excellence.

## Next Step: 

`npm start lesson_6`

