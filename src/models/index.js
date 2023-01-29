// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Card, List } = initSchema(schema);

export {
  Card,
  List
};