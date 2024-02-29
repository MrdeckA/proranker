export default class Agency {
  public id?: string;
  public _id?: string;
  public name?: string;
  public legalName?: string;
  public shortName?: string;
  public slug?: string;
  public tagline?: string;
  public about?: string;
  public address?: string;
  public city?: string;
  public email?: string;
  public emailVerified?: Boolean;
  public password?: string;
  public confirmationPassword?: string;
  public phoneNumber?: string;
  public onlinelink?: string;
  public legalProofs?: string[];
  public references?: string;

  constructor(agency: Partial<Agency> = {}) {
    this.id = agency.id;
    this._id = agency._id;
    this.name = agency.name;
    this.legalName = agency.legalName;
    this.shortName = agency.shortName;
    this.slug = agency.slug;
    this.tagline = agency.tagline;
    this.about = agency.about;
    this.address = agency.address;
    this.city = agency.city;
    this.email = agency.email;
    this.password = agency.password;
    this.confirmationPassword = agency.confirmationPassword;
    this.phoneNumber = agency.phoneNumber;
    this.onlinelink = agency.onlinelink;
    this.legalProofs = agency.legalProofs || [];
    this.references = agency.references;
    this.emailVerified = agency.emailVerified;
  }
}
