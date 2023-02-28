/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCardInput = {
  id?: string | null,
  front?: string | null,
  back?: string | null,
  listId: string,
};

export type ModelCardConditionInput = {
  front?: ModelStringInput | null,
  back?: ModelStringInput | null,
  listId?: ModelIDInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Card = {
  __typename: "Card",
  id: string,
  front?: string | null,
  back?: string | null,
  listId: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateCardInput = {
  id: string,
  front?: string | null,
  back?: string | null,
  listId?: string | null,
};

export type DeleteCardInput = {
  id: string,
};

export type CreateListInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelListConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelListConditionInput | null > | null,
  or?: Array< ModelListConditionInput | null > | null,
  not?: ModelListConditionInput | null,
};

export type List = {
  __typename: "List",
  id: string,
  name?: string | null,
  cards?: ModelCardConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelCardConnection = {
  __typename: "ModelCardConnection",
  items:  Array<Card | null >,
  nextToken?: string | null,
};

export type UpdateListInput = {
  id: string,
  name?: string | null,
};

export type DeleteListInput = {
  id: string,
};

export type ModelCardFilterInput = {
  id?: ModelIDInput | null,
  front?: ModelStringInput | null,
  back?: ModelStringInput | null,
  listId?: ModelIDInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type ModelListFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelListFilterInput | null > | null,
  or?: Array< ModelListFilterInput | null > | null,
  not?: ModelListFilterInput | null,
};

export type ModelListConnection = {
  __typename: "ModelListConnection",
  items:  Array<List | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  front?: ModelSubscriptionStringInput | null,
  back?: ModelSubscriptionStringInput | null,
  listId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCardFilterInput | null > | null,
  or?: Array< ModelSubscriptionCardFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionListFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionListFilterInput | null > | null,
  or?: Array< ModelSubscriptionListFilterInput | null > | null,
};

export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateListMutationVariables = {
  input: CreateListInput,
  condition?: ModelListConditionInput | null,
};

export type CreateListMutation = {
  createList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateListMutationVariables = {
  input: UpdateListInput,
  condition?: ModelListConditionInput | null,
};

export type UpdateListMutation = {
  updateList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteListMutationVariables = {
  input: DeleteListInput,
  condition?: ModelListConditionInput | null,
};

export type DeleteListMutation = {
  deleteList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetCardQueryVariables = {
  id: string,
};

export type GetCardQuery = {
  getCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCardsQueryVariables = {
  filter?: ModelCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCardsQuery = {
  listCards?:  {
    __typename: "ModelCardConnection",
    items:  Array< {
      __typename: "Card",
      id: string,
      front?: string | null,
      back?: string | null,
      listId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetListQueryVariables = {
  id: string,
};

export type GetListQuery = {
  getList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListListsQueryVariables = {
  filter?: ModelListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListListsQuery = {
  listLists?:  {
    __typename: "ModelListConnection",
    items:  Array< {
      __typename: "List",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCardSubscriptionVariables = {
  filter?: ModelSubscriptionCardFilterInput | null,
  owner?: string | null,
};

export type OnCreateCardSubscription = {
  onCreateCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCardSubscriptionVariables = {
  filter?: ModelSubscriptionCardFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCardSubscription = {
  onUpdateCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCardSubscriptionVariables = {
  filter?: ModelSubscriptionCardFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCardSubscription = {
  onDeleteCard?:  {
    __typename: "Card",
    id: string,
    front?: string | null,
    back?: string | null,
    listId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
  owner?: string | null,
};

export type OnCreateListSubscription = {
  onCreateList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
  owner?: string | null,
};

export type OnUpdateListSubscription = {
  onUpdateList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteListSubscriptionVariables = {
  filter?: ModelSubscriptionListFilterInput | null,
  owner?: string | null,
};

export type OnDeleteListSubscription = {
  onDeleteList?:  {
    __typename: "List",
    id: string,
    name?: string | null,
    cards?:  {
      __typename: "ModelCardConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
