import { DataSource } from 'typeorm';

export const subscriberFactory =
  <T>(SubscriberClass: new () => T) =>
  (dataSource: DataSource): T => {
    const subscriber = new SubscriberClass();
    dataSource.subscribers.push(subscriber);
    return subscriber;
  };
