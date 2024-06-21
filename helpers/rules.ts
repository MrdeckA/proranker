export const ruleRequired = (v: any) => !!v || "* Champ Requis";
export const ruleEmail = (value: any) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Entrez une adresse email valide";
};
export const rulePassLen = (v: string) =>
  (!!v && v.length >= 6) ||
  "Le mot de passe doit comporter 6 caractères ou plus";

export const ruleLinkURL = (str: string) => {
  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return linkRegex.test(str) || "Vous devez entrer une URL valide";
};

export const ruleOpenAIAPIKey = (str: string) => {
  const linkRegex = /^sk-[A-Za-z0-9]{32,}$/;

  return linkRegex.test(str) || "Clé API invalide";
};
