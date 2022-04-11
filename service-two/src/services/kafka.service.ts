import { Kafka } from 'kafkajs';
import { Types } from 'mongoose';
import { UserModel } from '../database/users/users.model';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [String(process.env.CONFLUENT_BROKER)],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: String(process.env.CONFLUENT_USERNAME),
    password: String(process.env.CONFLUENT_PASSWORD),
  },
});

const producer = kafka.producer();

const sendNewMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'alohomora',
    messages: [{ key: 'name', value: 'bruno alencar kafkeiro' }],
  });
};
// sendNewMessage();

const consumerMessageFromUsers = kafka.consumer({
  groupId: 'service-two-group',
});

const consumeMessages = async () => {
  await consumerMessageFromUsers.connect();
  await consumerMessageFromUsers.subscribe({
    topic: 'mongodb.alencar.users',
    fromBeginning: false,
  });
  await consumerMessageFromUsers.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log({
        value: message.value!.toString(),
      });

      const user = handleData(JSON.parse(message.value!.toString()));
      await UserModel.updateOne({ _id: user._id }, user, { upsert: true });
    },
  });
};

consumeMessages();

function handleData(data: any) {
  const newObject = {
    ...data,
    _id: new Types.ObjectId(JSON.parse(data._id).$oid),
  };
  return newObject;
}
