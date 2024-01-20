import { Auth } from "../model/Auth/Auth";
import { hashPassword, verifyPassword } from "../utils/Utils";

interface IAuthRepo {
  create(user: Auth): Promise<void>;
  getById(cid: string): Promise<Auth>;
}

export class AuthRepo implements IAuthRepo {
  
  async create(model: Auth): Promise<void> {
    try {
      await Auth.create({
        clientid: model.clientid,
        clientsecret: model.clientsecret,
        clienturl: model.clienturl,
      });
    } catch (err : any) {
      const result = await Auth.findOne({ where: { clientid : model.clientid } });

      if (result) {
        throw new Error("Failed to create Auth User!| Auth User already exists!");
          return;
      }
      throw new Error("Failed to create Auth User!| | "+err.message);
    }
  }

  async getById(cid: string): Promise<Auth> {
    try {
      const result = await Auth.findOne({ where: { clientid: cid } });
      if (!result) {
        throw new Error("Data not found!");
      }
      return result;
    } catch (err : any) {
      throw new Error("Failed to get! | "+err.message);
    }
  }
}
