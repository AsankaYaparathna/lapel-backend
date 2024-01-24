import { Admin } from "../../model/Admin/Admin";
import { hashPassword, verifyPassword } from "../../utils/Utils";


interface IAdminRepo {
  login(mobileNumber: string, password: string): Promise<Boolean | null>;
  create(user: Admin): Promise<Boolean | null>;
}

export class AdminRepo implements IAdminRepo {
  async verifyPassword(user: Admin, providedPassword: string): Promise<boolean> {
    return verifyPassword(user.password, providedPassword);
  }

  async login(userName: string, password: string): Promise<Boolean | null> {
    try {
      const result = await Admin.findOne({
        where: { userName: userName },
        attributes: ['id', 'userName', 'password'],
      });

      if (!result) {
        throw new Error("User not found!");
      }

      if (result) {
        if(verifyPassword(result.password, password)){
            return true;
        }
        else{
          return false;
        }
      } else {
        return null;
      }
    } catch (err : any) {
      throw new Error(""+err.message);
    }
  }

  async create(model:Admin): Promise<Boolean | null> {
    try {
        const encpw = hashPassword(model.password);
        await Admin.create({
            userName: model.userName,
            password: encpw
          });
          return true;
    } catch (err : any) {
      throw new Error(""+err.message);
    }
  }

}
