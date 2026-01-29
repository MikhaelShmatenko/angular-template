import { UserInfo } from "./user-info";

export interface ProductInfo {
  _id: string;
  name: string;
  type: string;
  price: number;
  exclusive: boolean;
  creator: UserInfo;
}
