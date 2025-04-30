import { Request } from 'express';
import { IAdminData } from 'src/modules/auth/interfaces';

export interface IRequestWithAdmin extends Request {
  user: IAdminData;
}
