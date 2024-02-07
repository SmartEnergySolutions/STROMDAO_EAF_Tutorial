# Energy Balancing

## Objective
The objective of the "Balancing Part 1" lesson in the STROMDAO Energy Application Framework tutorial is to provide learners with a comprehensive understanding of the basic concepts related to balancing in the energy sector. This lesson focuses on the creation of demo meters for testing, setting up rules, and understanding the difference between meters and balancing points. Additionally, learners will gain hands-on experience by using microservices directly to configure balancing groups.

By the end of this lesson, learners should be able to:

1.  Understand the importance of balancing in the energy sector and its role in ensuring grid stability and efficient energy distribution.
2.  Create demo meters for testing purposes, allowing learners to simulate and analyze different scenarios related to balancing.
3.  Set up rules for balancing, enabling learners to define specific criteria and conditions for balancing operations.
4.  Differentiate between meters and balancing points, understanding their respective roles and functionalities in the energy system.
5.  Gain practical experience in configuring balancing groups using microservices, even though this approach is typically used in large-scale installations by grid operators or major utilities.
6.  Recognize the benefits of using the web interface of the admin UI for balancing setup in smaller installations, where it is more suitable and user-friendly.


## Implementation Balancing Rules
Sample code in `4_balancing.js`:
```javascript
    result.rules.push(await eaf_node.call("asset.upsert",{
        assetId: 'balancingMeter0',
        type: 'balance',
        balancerule: {
            to: "DemoBalanceGroup"
        }
    }));
    
    for(let i=1;i<4;i++) {
        result.rules.push(await eaf_node.call("asset.upsert",{
            assetId: 'balancingMeter'+i,
            type: 'balance',
            balancerule: {
                from: "DemoBalanceGroup"
            }
        }));
    }
```

### Steps
Ddefine and configure meters with balancing rules in the context of the STROMDAO Energy Application Framework.

Here's a breakdown of what the code does:

1.  The code initializes an empty array called `result.rules` to store the balancing rules.
    
2.  The first `await` statement adds a balancing rule to the `result.rules` array using the `eaf_node.call` function. The `asset.upsert` method is called with an object as its argument. This object specifies the `assetId` as `'balancingMeter0'`, the `type` as `'balance'`, and the `balancerule` as an object with a `to` property set to `'DemoBalanceGroup'`. This means that `'balancingMeter0'` will deliver electricity to the `'DemoBalanceGroup'` balance group.
    
3.  The `for` loop iterates from `1` to `3` (exclusive) and performs the same operation as the first `await` statement, but with different `assetId` values. It adds balancing rules for `'balancingMeter1'` to `'balancingMeter3'`, with the `balancerule` object specifying a `from` property set to `'DemoBalanceGroup'`. This means that `'balancingMeter1'` to `'balancingMeter3'` will consume electricity from the `'DemoBalanceGroup'` balance group.
    

All meters share the same balance group, with `'balancingMeter0'` delivering electricity to the balance group, and `'balancingMeter1'` to `'balancingMeter3'` consuming electricity from the balance group. The code utilizes the `asset.upsert` method to add balancing rules to the meters.

## Setup Demo Meters
Sample code in `4_balancing_part1.js`:
```javascript
 for(let i=0;i<5;i++) {
        result.meters.push(await eaf_node.call("demometer.populate24h",{
            meterId: 'balancingMeter' + i,
            kwha: 1000 + Math.round(Math.random()*5000)
        }));   
    }
```
### Steps
1.  The `for` loop iterates from `0` to `4` (inclusive) and performs the following operations for each iteration:
    
2.  Inside the loop, the `await` statement calls the `eaf_node.call` function with the `demometer.populate24h` method. It passes an object as its argument, which specifies the `meterId` as `'balancingMeter' + i` (where `i` is the current iteration value) and the `kwha` as `1000 + Math.round(Math.random()*5000)`. This generates a random value between 1000 and 6000 (inclusive) for the `kwha` property.
    
3.  The resulting meter object is then pushed into the `result.meters` array.
    
In summary, the code segment creates five meters with IDs `'balancingMeter0'` to `'balancingMeter4'` and populates each meter with random readings using the `demometer.populate24h` microservice method. The `kwha` property of each meter is set to a random value between 1000 and 6000.

It is important to define the balancing rules from the previous step before populating the meter readings because the balancing rules determine how the meters interact with the balance group. By defining the rules first, the meters can be properly configured to deliver or consume electricity based on the balancing group setup.

## Balancing Points vs. Meter Points
In the energy industry, a balancing point is a location where electricity is injected into or withdrawn from the grid. Every meter is typically a balancing point, but not every balancing point is a meter. A practical example is two households that receive a single electricity bill. They both have an "internal" meter, but the utility sends a combined bill for the sum of both meters. In this case, the summing meter is a balancing point, while the internal meters are physical meters.

## Assets 
All balancing points are considered assets in the Energy Application Framework. Assets can have metadata associated with them, such as an address or, in the case of a balancing point, a balancing rule.

## Balancing Rules

Balancing rules define the economic aspects of a physical energy exchange at a balancing point. Electricity meters themselves have no direction, so there is no difference between a generation meter and a consumption meter. They both follow the same principles of counting measurements of an electricity flow.

During balancing, the balancing rule(s) distinguish between a meter providing electricity and a meter consuming energy. In the Energy Application Framework, an asset might have a balance rule like the following:

```
{
    "assetId": "gms3",
    "type": "balance",
    "balancerule": {
      "from": "stromdao",
      "updated": 1706713813970
    },
    "balance_updated": 1706709484146
}
```

In this example, the balancing point gms3 delivers electricity to the balancing point stromdao.

Balancing rules are an essential part of the Energy Application Framework, as they allow for the economic settlement of energy exchanges between different parties.

## Balancing Groups

Balancing groups are a collection of balancing points that share the same assetId either as from or to in the balancing rules. In the example code provided, the following balancing group is created:
`DemoBalanceGroup`
The balancing group contains the following balancing points:

-   `balancingMeter0` (to)
-   `balancingMeter1` (from)
-   `balancingMeter2` (from)
-   `balancingMeter3` (from)

**Internal and External Economy**

Balancing groups have an internal economy and an external economy. The internal economy manages the balancing of energy within the group, while the external economy manages the exchange of energy with other balancing groups or external balancing points.

In the example provided, the balancing group `DemoBalanceGroup` has an internal economy that ensures that `balancingMeter0` has enough electricity to meet the demand of `balancingMeter1`, `balancingMeter2`, and `balancingMeter3`. If `balancingMeter0` does not have enough electricity, it can purchase it from another balancing group or external balancing point.

## Conclusion
The "Balancing Part 1" lesson in the STROMDAO Energy Application Framework tutorial provides a comprehensive introduction to the concepts of balancing in the energy sector and how to implement balancing rules using the framework. Here are the key lessons learned from this tutorial:

1.  **Balancing is crucial for grid stability and efficient energy distribution.** By understanding the principles of balancing, learners can contribute to the smooth operation of the energy grid.
    
2.  **Demo meters are valuable tools for testing and simulating various scenarios related to balancing.** Creating demo meters allows learners to experiment with different configurations and analyze the impact of various factors on the balancing process.
    
3.  **Balancing rules define the economic aspects of energy exchanges.** By setting up appropriate balancing rules, learners can ensure that energy is distributed fairly and efficiently among different parties.
    
4.  **Meters and balancing points have distinct roles in the energy system.** Meters measure the flow of electricity, while balancing points are used for economic settlement of energy exchanges. Understanding this distinction is essential for effective balancing management.
    
5.  **Balancing groups facilitate the management of energy flows between multiple balancing points.** By creating balancing groups, learners can simulate real-world scenarios where multiple parties are involved in energy exchange.
    
6.  **The STROMDAO Energy Application Framework provides a powerful platform for implementing and testing balancing mechanisms.** The microservices-based architecture allows learners to gain hands-on experience in configuring balancing rules and observing their impact on the system.
    
7.  **The web interface of the admin UI offers a user-friendly alternative for balancing setup in smaller installations.** While the microservices approach is suitable for large-scale installations, the web interface provides a more accessible option for smaller setups.

## Next Step: 

`npm start lesson_5`

