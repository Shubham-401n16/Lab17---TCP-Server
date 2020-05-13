'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to CSPS Server!');
});

socket.on('data', (payload) => {
    let jsonPayload = JSON.parse(payload.toString());

    if(jsonPayload.event === 'delivered')
    console.log('Thanks for delivering',jsonPayload.customerOrder.orderId);

});

setInterval(() =>{
    let customerOrder = {
        time: faker.date.recent(),
        store: faker.company.companyName(),
        orderId: faker.random.number(),
        customer: faker.name.findName(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}`,
      };
      socket.write(JSON.stringify({event: 'pickup', customerOrder: customerOrder}));
}, 5000);
