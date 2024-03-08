import { Op } from "sequelize";
import { Cart } from "../../model/Cart/Cart";
import { User } from "../../model/Customer/User";


interface ISessionRepo {
  startSession(model : any): Promise<any>;
}

export class SessionRepo implements ISessionRepo {

  async startSession(model : any): Promise<any> {
    try {
      const result = await User.findOne({  where: {
        [Op.or]: [
          { mobileNumber: model.id },
          { customerId: model.id }
        ]
      }
    });

      if (!result) {
        throw new Error("User not found!");
      }


      const cartModel = await Cart.findAll({ where  : { customerId: result.id }});
      return cartModel;

    } catch (err : any) {
      throw new Error(""+err.message);
    }
  }



}
