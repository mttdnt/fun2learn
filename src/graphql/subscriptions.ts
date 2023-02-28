/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onCreateCard(filter: $filter, owner: $owner) {
      id
      front
      back
      listId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onUpdateCard(filter: $filter, owner: $owner) {
      id
      front
      back
      listId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard(
    $filter: ModelSubscriptionCardFilterInput
    $owner: String
  ) {
    onDeleteCard(filter: $filter, owner: $owner) {
      id
      front
      back
      listId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onCreateList(filter: $filter, owner: $owner) {
      id
      name
      cards {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onUpdateList(filter: $filter, owner: $owner) {
      id
      name
      cards {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onDeleteList(filter: $filter, owner: $owner) {
      id
      name
      cards {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
