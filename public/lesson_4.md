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


## Next Step: 

`npm start lesson_5`

