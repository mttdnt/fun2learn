import type { Card as APICard, List as APIList } from "../API";

export type Card = Omit<APICard, "__typename">;

export type List = Omit<APIList, "__typename">;
