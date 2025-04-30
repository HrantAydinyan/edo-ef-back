export interface ILoginResponse {
  success: boolean;
  accessToken: string;
}

export interface IPayload {
  id: number;
  name: string;
  email: string;
}

export interface IAdminData {
  id: number;
  email: string;
  name: string;
}
