import type { FlatJSONLike, Nullable } from "./base";
import * as models from "@/models";

export type DynamicPath = string | ((values?: string) => string);

export type TTenant = Omit<models.Tenant, "prototype">;

export type BaseHttpGetOptions = {
  pageUrl?: Nullable<string>;
  query?: FlatJSONLike;
};
export interface Campagne {
  id?: number;
  nom?: string;
  description_poste?: string;
  intitule_poste?: string;
  minimum_number_of_languages?: number;
  minimum_number_of_experiences?: number;
  minimum_number_of_years_of_experience?: number;
  degrees?: string[];
  languages?: string[];
  skills?: string[];
  has_awards?: boolean;
  has_certifications?: boolean;
  fichiers?: File[];
  certifications?: string[];
  numberoffiles?: Number;
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

export type ErrorMessages = Record<string, string[]>;
export type DRFValidationError = Record<string, string[]>;

export type BaccalaureatRecommande =
  | "A1"
  | "A2"
  | "B"
  | "C"
  | "D"
  | "G1"
  | "G2"
  | "G3";
export type SideNavigationRoute = {
  nameKeyPath: string;
  path: DynamicPath;
  icon: string;
};

export type TAgency = Omit<models.Agency, "prototype">;
export type TUser = Omit<models.User, "prototype">;
