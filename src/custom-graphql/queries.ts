export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      cards {
        nextToken
        items {
          id
          front
          back
          listId
        }
      }
    }
  }
`;

export default {
  getList
};
