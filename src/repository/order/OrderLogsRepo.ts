import { CartOrder } from "../../model/Cart/CartOrder";
import { CartOrderLog } from "../../model/Cart/CartOrderLog";
import { OrderInvoice } from "../../model/Cart/OrderInvoice";
import { generateCustomerId, generateInvoiceNo } from "../../utils/Utils";

interface IOrderLogsRepo {
  get(): Promise<any[]>;
  getById(id: number): Promise<any>;
  update(model: any): Promise<any>;
  delete(id: number): Promise<any>;
}

export class OrderLogsRepo implements IOrderLogsRepo {

  async create(model: any): Promise<any> {
    try {
      const newCreatedModel = await CartOrderLog.create({
        orderId: model.orderId,
        user: model.user,
        action: model.action,
        type: model.type,
      });
      return newCreatedModel;
    } catch (err: any) {
      throw new Error("Failed to add logs! | " + err.message);
    }
  }

  async get(): Promise<any[]> {
    try {
      const dbModel = await CartOrderLog.findAll();
      return await dbModel;
    } catch (err: any) {
      throw new Error("Failed to get order! | " + err.message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const dbModel = await CartOrderLog.findAll({ where: { id: id }});
      if (!dbModel) {
        throw new Error("Data not found!");
      }
      return await dbModel;
    
    } catch (err: any) {
      throw new Error("Failed to get order data! | " + err.message);
    }
  }

  async getByOrderId(id: number): Promise<any> {
    try {
      const dbModel = await CartOrderLog.findAll({ where: { orderId: id }});
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

  async delete(model: any): Promise<any> {
    try {
      const newModel = await CartOrderLog.findOne({ where: { id: model.id }, });
      if (!newModel) { return false; } 
      await newModel.destroy();
      return true;
    } catch (err: any) {
      throw new Error("Failed to update order! | " + err.message);
    }
  }

}
