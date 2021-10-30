import { Models } from "@rematch/core";
import { qrCode } from "./qrcode";

export interface RootModel extends Models<RootModel> {
  qrCode: typeof qrCode;
}
export const models: RootModel = { qrCode };