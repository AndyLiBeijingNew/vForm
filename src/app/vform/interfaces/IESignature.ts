import {IUser} from './IUser';
export interface IESignature {
  user: IUser;
  signedOn: Date;
  remarks: string;
}
