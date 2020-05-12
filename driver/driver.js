'use strict';

const net = require('net');
const socket = net.Socket();

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to CSPS Server!');
});

socket.on('data', (payload) => {
    let stringPayload = Buffer.from(payload).toString();
    //let jsonPayload = {};
    jsonPayload = JSON.parse(stringPayload);

    // try {
    //     jsonPayload = JSON.parse(stringPayload);
    // } catch (e) {
    //     jsonPayload = {};
    // }

    if (jsonPayload.event === 'pickup')
    setInterval(()=> {

        console.log('Picked up order#', jsonPayload.content.orderId);
        socket.write(JSON.stringify({event: 'in-transit', content: jsonPayload.content}))
    },1000)


    setInterval(()=> {

        console.log('delivered order #', jsonPayload.content.orderId);
        socket.write(JSON.stringify({event: 'delivered', content: jsonPayload.content}))
    },3000)
    
});