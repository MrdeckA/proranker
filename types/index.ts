import type { FlatJSONLike, Nullable } from "./base";
import * as molds from "@/models";

export type DynamicPath = string | ((values?: string) => string);

export type TTenant = Omit<molds.Tenant, "prototype">;

export type BaseHttpGetOptions = {
  pageUrl?: Nullable<string>;
  query?: FlatJSONLike;
};
