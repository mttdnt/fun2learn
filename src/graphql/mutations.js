/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSentences = /* GraphQL */ `
  mutation CreateSentences(
    $input: CreateSentencesInput!
    $condition: ModelSentencesConditionInput
  ) {
    createSentences(input: $input, condition: $condition) {
      id
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const updateSentences = /* GraphQL */ `
  mutation UpdateSentences(
    $input: UpdateSentencesInput!
    $condition: ModelSentencesConditionInput
  ) {
    updateSentences(input: $input, condition: $condition) {
      id
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const deleteSentences = /* GraphQL */ `
  mutation DeleteSentences(
    $input: DeleteSentencesInput!
    $condition: ModelSentencesConditionInput
  ) {
    deleteSentences(input: $input, condition: $condition) {
      id
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const createCharacters = /* GraphQL */ `
  mutation CreateCharacters(
    $input: CreateCharactersInput!
    $condition: ModelCharactersConditionInput
  ) {
    createCharacters(input: $input, condition: $condition) {
      id
      simplified
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const updateCharacters = /* GraphQL */ `
  mutation UpdateCharacters(
    $input: UpdateCharactersInput!
    $condition: ModelCharactersConditionInput
  ) {
    updateCharacters(input: $input, condition: $condition) {
      id
      simplified
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
export const deleteCharacters = /* GraphQL */ `
  mutation DeleteCharacters(
    $input: DeleteCharactersInput!
    $condition: ModelCharactersConditionInput
  ) {
    deleteCharacters(input: $input, condition: $condition) {
      id
      simplified
      pinyin
      english
      createdAt
      updatedAt
    }
  }
`;
