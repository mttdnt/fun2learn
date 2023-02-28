export type GetListQuery = {
  getList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
      items: Array< {
        __typename: "Card",
        id: string,
        front?: string | null,
        back?: string | null,
        listId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};