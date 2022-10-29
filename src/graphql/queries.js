/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSentences = /* GraphQL */ `
  query GetSentences($id: ID!) {
    getSentences(id: $id) {
      id
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const listSentences = /* GraphQL */ `
  query ListSentences(
    $filter: ModelSentencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSentences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pinyin
        english
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCharacters = /* GraphQL */ `
  query GetCharacters($id: ID!) {
    getCharacters(id: $id) {
      id
      simplified
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const listCharacters = /* GraphQL */ `
  query ListCharacters(
    $filter: ModelCharactersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        simplified
        pinyin
        english
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
