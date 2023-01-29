import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type CardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerCard = {
  readonly id: string;
  readonly front?: string | null;
  readonly back?: string | null;
  readonly listId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCard = {
  readonly id: string;
  readonly front?: string | null;
  readonly back?: string | null;
  readonly listId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Card = LazyLoading extends LazyLoadingDisabled ? EagerCard : LazyCard

export declare const Card: (new (init: ModelInit<Card, CardMetaData>) => Card) & {
  copyOf(source: Card, mutator: (draft: MutableModel<Card, CardMetaData>) => MutableModel<Card, CardMetaData> | void): Card;
}

type EagerList = {
  readonly id: string;
  readonly name?: string | null;
  readonly cards?: (Card | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyList = {
  readonly id: string;
  readonly name?: string | null;
  readonly cards: AsyncCollection<Card>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type List = LazyLoading extends LazyLoadingDisabled ? EagerList : LazyList

export declare const List: (new (init: ModelInit<List, ListMetaData>) => List) & {
  copyOf(source: List, mutator: (draft: MutableModel<List, ListMetaData>) => MutableModel<List, ListMetaData> | void): List;
}