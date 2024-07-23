export interface UserModel {
  useruid: string;
  sessionuid: string;
  token: string;
  firstname: string;
  lastname: string;
  companyname: string;
  loginname: string;
  isadmin: number;
  ismanager: number;
  islocaladmin: number;
  issalesperson: number;
  locationuid: string;
  locationname: string;
}
