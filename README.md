# STROMDAO EAF Tutorial
Step by Step tutorial for the [Energy Application Framework](https://energy.js.org/)


[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/SmartEnergySolutions/STROMDAO_EAF_Tutorial)


## Lesson 1: [Update Meter Reading](./public/lesson_1.md)
Provide a random meter reading to the STROMDAO Energy Application Framework (EAF) and view the results using the EAF API.

- This lesson provided an overview of how to update meter readings using the EAF.
- The next step is to explore settlement microservices, which play a crucial role in the energy industry by enabling efficient and accurate reconciliation of energy transactions.

`npm start lesson_1`

## Lesson 2: [Settlement](./public/lesson_2.md)
Understand the concept of settlements and their implementation in the Energy Application Framework. Learn how to split the consumption delta between different price segments when only two meter readings are available.

- Settlements play a crucial role in the Energy Application Framework, particularly in the distribution and pricing of energy consumption.
- Settlements are an important component in various processes within the energy industry.
- The introduction of smart meters has enhanced the settlement process by providing more accurate and timely data on energy consumption.

`npm start lesson_2`

## Lesson 3: [Clearing](./public/lesson_3.md)
Understand the concept of clearing in the energy industry and its significance in the transfer of ownership.
Explore the concept of clearings as a "digital identity" represented by a DID document. Implement a basic clearing process by simulating two readings and a settlement. Examine the result object and the clearingJWT field.Discuss the practical use of the Clearing JWT as a Clearing Identity.

- Clearing plays a crucial role in the energy industry by finalizing the transfer of ownership of energy resources.
- The Energy Application Framework incorporates the use of digital identities for clearings, enhancing the integrity and reliability of the transfer of ownership.
- The Clearing JWT serves as a verifiable digital identity, providing a transparent and tamper-proof record of the cleared transaction.
- The practical use of the Clearing JWT as a Clearing Identity can prevent duplicate payments and facilitate efficient and transparent transactions.

`npm start lesson_3`

## Lesson 4: [Balancing Part 1](./public/lesson_4.md)
This lesson provides learners with a comprehensive understanding of the basic concepts related to balancing in the energy sector. This lesson focuses on the creation of demo meters for testing, setting up rules, and understanding the difference between meters and balancing points. Additionally, learners gain hands-on experience by using microservices directly to configure balancing groups

- Understand the importance of balancing in the energy sector and its role in ensuring grid stability and efficient energy distribution.
- Create demo meters for testing purposes, allowing learners to simulate and analyze different scenarios related to balancing.
Set up rules for balancing, enabling learners to define specific criteria and conditions for balancing operations.
- Differentiate between meters and balancing points, understanding their respective roles and functionalities in the energy system.
- Gain practical experience in configuring balancing groups using microservices, even though this approach is typically used in large-scale installations by grid operators or major utilities.
- Recognize the benefits of using the web interface of the admin UI for balancing setup in smaller installations, where it is more suitable and user-friendly

`npm start lesson_4`

## License

Distributed under the Apache-2.0 License. See [License](./LICENSE) for more information.


## [Maintainer / Imprint](https://github.com/energychain/STROMDAO_EAFs/blob/main/IMPRINT.md)

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
dev@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)<br/>
  <br/>
https://stromdao.de/<br/>
</addr>