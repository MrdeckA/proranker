// Exemple avec Nuxt.js et string-similarity

import stringSimilarity from "string-similarity";
function matchChains(chaine1, chaine2) {
  const similarity = stringSimilarity.compareTwoStrings(chaine1, chaine2);

  if (similarity > 0.8) {
    // Ajustez ce seuil selon vos besoins
    console.log("Les chaînes sont suffisamment similaires !", similarity);
  } else {
    console.log("Les chaînes ne sont pas assez similaires.", similarity);
  }
}

matchChains("nuxt.js", "nuxt.js");
