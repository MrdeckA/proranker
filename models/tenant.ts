export default class Tenant {
  public id?: string;
  public _id?: string;

  public firstName?: string;
  public lastName?: string;
  public fullName?: string;
  public email?: string;
  public password?: string;
  public phoneNumber?: string;
  public invitationStatus?: string;
  public address?: string;
  public resetToken?: string;
  public appVersion?: string;
  public appOs?: string;
  public fcmToken?: string;

  constructor(tenant: Partial<Tenant> = {}) {
    this.id = tenant.id;
    this._id = tenant._id;
    this.invitationStatus = tenant.invitationStatus;
    this.firstName = tenant.firstName;
    this.lastName = tenant.lastName;
    this.fullName = tenant.fullName;
    this.email = tenant.email;
    this.password = tenant.password;
    this.phoneNumber = tenant.phoneNumber;
    this.address = tenant.address;
    this.resetToken = tenant.resetToken;
    this.appVersion = tenant.appVersion || "";
    this.appOs = tenant.appOs || "";
    this.fcmToken = tenant.fcmToken;
  }
}
