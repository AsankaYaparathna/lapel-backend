import { CartOrder } from "../../model/Cart/CartOrder";

interface IOrderRepo {
  checkout(model: any): Promise<any>;
  get(): Promise<any[]>;
  getById(id: number): Promise<any>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
}

export class OrderRepo implements IOrderRepo {

  async checkout(model: any): Promise<any> {
    try {
      const newCreatedModel = await CartOrder.create({
        customerId: model.customerId,
        noOfItems: model.noOfItems,
        subTotal: model.subTotal,
        shippingCost: model.shippingCost,
        totalAmmount: model.totalAmmount,
        balance: model.balance,
        firstName: model.firstName,
        lastName: model.lastName,
        mobile: model.mobile,
        mobile2: model.mobile2,
        email: model.email,
        billing: model.billing,
        deliveryMethod: model.deliveryMethod,
        notes: model.notes,
        status: model.status,
        orderStatus: model.orderStatus,
        cartIdList: model.cartIdList,
      });
      return newCreatedModel;
    } catch (err: any) {
      throw new Error("Failed to checkout order! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const dbModel = await CartOrder.findAll();
      return await dbModel;
    } catch (err: any) {
      throw new Error("Failed to get order! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const dbModel = await CartOrder.findAll({ where: { id: id }});
      if (!dbModel) {
        throw new Error("Data not found!");
      }
      return await dbModel;
    
    } catch (err: any) {
      throw new Error("Failed to get order data! | " + err.message);
    }
  }
  
  async update(model: any): Promise<any> {
    try {
      const newModel = await CartOrder.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.customerId = model.customerId;
        newModel.noOfItems = model.noOfItems;
        newModel.subTotal = model.subTotal;
        newModel.shippingCost = model.shippingCost;
        newModel.totalAmmount = model.totalAmmount;
        newModel.balance = model.balance;
        newModel.firstName = model.firstName;
        newModel.lastName = model.lastName;
        newModel.mobile = model.mobile;
        newModel.mobile2 = model.mobile2;
        newModel.email = model.email;
        newModel.billing = model.billing;
        newModel.deliveryMethod = model.deliveryMethod;
        newModel.notes = model.notes;
        newModel.status = model.status;
        newModel.orderStatus = model.orderStatus;
        newModel.cartIdList = model.cartIdList;
        await newModel.save();
      }
      return true;
    } catch (err: any) {
      throw new Error("Failed to update order! | " + err.message);
    }
  }

  async updatePayment(model: any): Promise<any> {
    try {
      const newModel = await CartOrder.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.payment = model.payment;
        await newModel.save();
      }
      return true;
    } catch (err: any) {
      throw new Error("Failed to update order payment details! | " + err.message);
    }
  }

  async updateStatus(model: any): Promise<any> {
    try {
      const newModel = await CartOrder.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      else {
        newModel.orderStatus = model.orderStatus;
        await newModel.save();
      }
      return true;
    } catch (err: any) {
      throw new Error("Failed to update order status! | " + err.message);
    }
  }
  async delete(id: number): Promise<any> {
    try {
      const newModel = await CartOrder.findOne({ where: { id: id } });
      
      if (!newModel ) {
        throw new Error("Data not found!");
      }
      await CartOrder.destroy({ where: { id: id } });

      return  true;
    } catch (err: any) {
      throw new Error("Failed to delete Custom Product Package! | " + err.message);
    }
  }

  async shopCheckout(model: any): Promise<any> {
    try {
      const newCreatedModel = await CartOrder.create({
        customerId: model.customerId,
        noOfItems: model.noOfItems,
        subTotal: model.subTotal,
        shippingCost: model.shippingCost,
        totalAmmount: model.totalAmmount,
        balance: model.balance,
        firstName: model.firstName,
        lastName: model.lastName,
        mobile: model.mobile,
        mobile2: model.mobile2,
        email: model.email,
        billing: model.billing,
        deliveryMethod: model.deliveryMethod,
        notes: model.notes,
        status: model.status,
        orderStatus: model.orderStatus,
        cartIdList: model.cartIdList,
      });
      return newCreatedModel;
    } catch (err: any) {
      throw new Error("Failed to checkout order! | " + err.message);
    }
  }
}
