import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { sortAndDeduplicateDiagnostics } from 'typescript';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connect to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    console.log(`Message received #${msg.getSequence()}, with data: ${data}`);

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
