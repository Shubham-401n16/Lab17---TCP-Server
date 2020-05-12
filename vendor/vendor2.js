'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to CSPS Server!');
});

setInterval(() =>{
    const customerOrder = {
        time: faker.date.recent(),
        store: faker.company.companyName(),
        orderId: faker.random.number(),
        customer: faker.name.findName(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}`,
      };
      socket.write(JSON.stringify({event: 'pickup', content: customerOrder}));
}, 5000);