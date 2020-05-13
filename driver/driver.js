'use strict';

const net = require('net');
const socket = net.Socket();

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to CSPS Server!');
});

socket.on('data', (payload) => {
    let jsonPayload = JSON.parse(payload.toString());

    if (jsonPayload.event === 'pickup'){
    setTimeout(()=> {

        let newPayLoad = {event: 'in-transit',order: jsonPayload.customerOrder}
        console.log('Picked up order#', jsonPayload.customerOrder.orderId);
        socket.write(JSON.stringify(newPayLoad));
    },1000)
};

if (jsonPayload.event === 'in-transit'){
    setInterval(()=> {
        let newPayLoad = {event: 'delivered',order: jsonPayload.customerOrder}
        console.log('delivered order #', jsonPayload.customerOrder.orderId);
        socket.write(JSON.stringify(newPayLoad));
    },3000)

};
    
});
