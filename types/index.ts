import type { FlatJSONLike, Nullable } from "./base";
export type DynamicPath = string | ((values?: string) => string);



export type BaseHttpGetOptions = {
  pageUrl?: Nullable<string>;
  query?: FlatJSONLike;
};
