import type { FlatJSONLike, Nullable } from "./base";
import * as molds from "@/models";

export type DynamicPath = string | ((values?: string) => string);

export type TTenant = Omit<molds.Tenant, "prototype">;

export type BaseHttpGetOptions = {
  pageUrl?: Nullable<string>;
  query?: FlatJSONLike;
};
export interface Campagne {
  id?: number;
  nom?: string;
  description?: string;
  intitule_poste?: string;
  minimum_number_of_languages?: number;
  minimum_number_of_experiences?: number;
  minimum_number_of_years_of_experience?: number;
  minimum_degree?: string;
  languages?: string | null;
  skills?: string | null;
  has_awards?: boolean;
  has_certifications?: boolean;
}

export interface Candidat {
  id?: number;
  campagne?: Campagne;
  nom?: string;
  prenom?: string;
  cv_path?: string;
  adresse?: string;
  email?: string;
  telephone?: string;
  cv_data_url?: string;
  cv_original_name?: string;
}

export interface Collaborateur {
  id?: number;
  user?: {
    id?: number;
    username?: string;
    // Ajoutez d'autres propriétés de l'utilisateur si nécessaire
  };
  campagne?: Campagne;
}
