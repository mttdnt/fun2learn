// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sentences, Characters } = initSchema(schema);

export {
  Sentences,
  Characters
};