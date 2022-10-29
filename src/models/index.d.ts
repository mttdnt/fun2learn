import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type SentencesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CharactersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerSentences = {
  readonly id: string;
  readonly pinyin?: string | null;
  readonly english?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySentences = {
  readonly id: string;
  readonly pinyin?: string | null;
  readonly english?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Sentences = LazyLoading extends LazyLoadingDisabled ? EagerSentences : LazySentences

export declare const Sentences: (new (init: ModelInit<Sentences, SentencesMetaData>) => Sentences) & {
  copyOf(source: Sentences, mutator: (draft: MutableModel<Sentences, SentencesMetaData>) => MutableModel<Sentences, SentencesMetaData> | void): Sentences;
}

type EagerCharacters = {
  readonly id: string;
  readonly simplified?: string | null;
  readonly pinyin?: string | null;
  readonly english?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCharacters = {
  readonly id: string;
  readonly simplified?: string | null;
  readonly pinyin?: string | null;
  readonly english?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Characters = LazyLoading extends LazyLoadingDisabled ? EagerCharacters : LazyCharacters

export declare const Characters: (new (init: ModelInit<Characters, CharactersMetaData>) => Characters) & {
  copyOf(source: Characters, mutator: (draft: MutableModel<Characters, CharactersMetaData>) => MutableModel<Characters, CharactersMetaData> | void): Characters;
}