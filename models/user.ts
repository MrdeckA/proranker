export default class User {
  public id?: string;
  public email?: string;
  public phone_number?: number;
  public username?: string;
  public password?: string;
  public confirmation_passsword?: string;
  public prenom?: string;
  public nom?: string;

  // COMPUTED PROPERTIES
  public avatar?: string;
  public full_name?: string;

  // METHODS GOES BELLOW

  constructor(u: Partial<User> = {}) {
    this.id = u.id;
    this.prenom = u.prenom;
    this.nom = u.nom;
    this.email = u.email;
    this.phone_number = u.phone_number;
    this.avatar = u.avatar;
    this.confirmation_passsword = u.confirmation_passsword;

    // CALCULATED ATTRS DEFINITIONS
    // https://github.com/microsoft/TypeScript/issues/14417
    // https://stackoverflow.com/questions/48725916/typescript-optional-property-with-a-getter
    Object.defineProperties(this, {
      full_name: {
        value: () => this.prenom + " " + this.nom,
        writable: false,
      },
    });
  }
}
