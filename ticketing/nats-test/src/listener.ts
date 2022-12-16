import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connect to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg: Message) => {
    console.log('Message received');
  });
});
