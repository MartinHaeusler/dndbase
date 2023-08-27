import { fetchGet } from "./server";
import { double, int } from "./typeAliases";

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  attunement: boolean;
  source?: string;
  extra?: string;
  description?: string;
  price?: number;
  subtype?: string;
  weight?: number;
  merchants: MerchantType[];
};

export const itemType = [
  "ARMOR",
  "POTION",
  "RING",
  "ROD",
  "SCROLL",
  "STAFF",
  "WAND",
  "WEAPON",
  "WONDROUS_ITEM",
] as const;
export type ItemType = (typeof itemType)[number];

export const itemRarity = [
  "COMMON",
  "UNCOMMON",
  "RARE",
  "VERY_RARE",
  "LEGENDARY",
  "ARTIFACT",
] as const;
export type ItemRarity = (typeof itemRarity)[number];

export const merchantType = [
  "SMITH",
  "TEMPLE",
  "WEAPONSMITH",
  "ARMORER",
  "ALCHEMIST",
  "HEALER",
  "WIZARD",
  "LIBRARIAN",
  "JEWELLER",
  "GENERAL",
  "CONCEALER",
  "BARD",
] as const;
export type MerchantType = (typeof merchantType)[number];

export const itemOrderBy = [
  "NAME",
  "PRICE",
  "WEIGHT",
  "RARITY",
  "TYPE",
  "SUBTYPE",
  "ATTUNEMENT",
] as const;
export type ItemOrderBy = (typeof itemOrderBy)[number];

export const orderDirection = ["ASCENDING", "DESCENDING"] as const;
export type OrderDirection = (typeof orderDirection)[number];

export type GetItemsQuery = {
  pageIndex?: int;
  pageSize?: int;
  orderBy?: ItemOrderBy;
  orderDirection?: OrderDirection;
  nameContains?: string;
  types?: ItemType[];
  merchants?: MerchantType[];
  rarities?: ItemRarity[];
  costMin?: double;
  costMax?: double;
};

export type PaginatedResponse<T> = {
  totalCount: number;
  pageContent: T[];
};

export async function getItemsForQuery(
  query: GetItemsQuery
): Promise<PaginatedResponse<Item>> {
  const response = await fetchGet("/items", query);
  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Expected fetch call to return an 'OK' status, but got: ${response.status}`
    );
  }
  const responseJson = await response.text();
  return JSON.parse(responseJson) as PaginatedResponse<Item>;
}
