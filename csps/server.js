'use strict';

const net = require('net');
const server = net.createServer();

let socketPool = [];
let port = process.env.SERVER_PORT || 3000;

server.listen(port, () => {
    console.log('Server is up and running on port', port);
});

server.on('connection', (socket) => {
    socketPool.push(socket);
    console.log('Received connection from', socket.address());

    socket.on('data', (payload) => {
       let dataParsed = JSON.parse(Buffer.from(payload).toString());
       let event = dataParsed.event;
       let custOrder = dataParsed.customerOrder;

       if (event === 'pickup'){
        console.log('pickup');
           console.log(payload.customerOrder);
           socketPool.forEach((socket) => {
            socket.write(payload);
          });
       }
       if( event === 'in-transit'){
           console.log(`in-transit order ${custOrder.orderId} `);
           socketPool.forEach((socket) => {
            socket.write(payload);
          });
       }
       if(event === 'delivered'){
           console.log(`delivered order ${custOrder.orderId}`);
           socketPool.forEach((socket) => {
            socket.write(payload);
          });
       }


    });
});