import { Cart } from "../../model/Cart/Cart";
import { User } from "../../model/Customer/User";

interface ICartRepo {
  finish(model: any): Promise<any>;
  add(model: any): Promise<any>;
  updateNoofitem(model: any): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<any>;
  getCartByUserId(id: number): Promise<any>;
  getCartByUserMobile(id: number): Promise<any>;
  get(): Promise<any[]>;
}

export class CartRepo implements ICartRepo {
  async finish(model: any): Promise<any> {
    try {
      const newCreatedModel = await Cart.create({
        customerId: model.customerId,
        packageId: model.packageId,
        status: false,
        styleList: model.styleList,
      });
      return newCreatedModel;
    } catch (err: any) {
      throw new Error("Failed to add cart! | " + err.message);
    }
  }

  async add(model: any): Promise<any> {
    try {
      const newModel = await Cart.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.name = model.name;
        newModel.measurement = model.measurement;
        newModel.note = model.note;
        newModel.noteImageUrl = model.noteImageUrl;
        await newModel.save();
      }
      return true;
    } catch (err: any) {
      throw new Error("Failed add to cart! | " + err.message);
    }
  }

  async updateNoofitem(model: any): Promise<any> {
    try {
      const newModel = await Cart.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.noOfItems = model.noOfItems;
        newModel.subTotal = model.subTotal;
        newModel.shippingCost = model.shippingCost;
        newModel.totalAmmount = model.totalAmmount;
        await newModel.save();
      }
      return true;
    } catch (err: any) {
      throw new Error("Failed to update no of items! | " + err.message);
    }
  }


  async delete(id: number): Promise<any> {
    try {
      const newModel = await Cart.findOne({ where: { id: id } });
      
      if (!newModel ) {
        throw new Error("Data not found!");
      }
      await Cart.destroy({ where: { id: id } });

      return  true;
    } catch (err: any) {
      throw new Error("Failed to delete Custom Product Package! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const dbModel = await Cart.findAll({ where: { id: id }});
      if (!dbModel) {
        throw new Error("Data not found!");
      }
      return await dbModel;
    
    } catch (err: any) {
      throw new Error("Failed to get cart data! | " + err.message);
    }
  }

  async getCartByUserId(id: number): Promise<any> {
    try {
      const dbModel = await Cart.findAll({ where: { customerId: id }});
      if (!dbModel) {
        throw new Error("Data not found!");
      }
      return await dbModel;
    
    } catch (err: any) {
      throw new Error("Failed to get cart data! | " + err.message);
    }
  }

  async getCartByUserMobile(id: number): Promise<any> {
    try {
      const dbUser = await User.findOne({ where: { mobileNumber: id }});
      if(!dbUser){
        throw new Error("User not found!");
      }
      const dbModel = await Cart.findAll({ where: { id: dbUser.id }});
      if (!dbModel) {
        throw new Error("Data not found!");
      }
      return await dbModel;
    
    } catch (err: any) {
      throw new Error("Failed to get cart data! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const dbModel = await Cart.findAll();
      return await dbModel;
    } catch (err: any) {
      throw new Error("Failed to get Custom Product! | " + err.message);
    }
  }

}
