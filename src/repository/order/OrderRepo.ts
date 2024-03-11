import { CartOrder } from "../../model/Cart/CartOrder";
import { OrderInvoice } from "../../model/Cart/OrderInvoice";
import { User } from "../../model/Customer/User";
import { generateCustomerId, generateInvoiceNo } from "../../utils/Utils";
import { OrderLogsRepo } from "./OrderLogsRepo";

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
        orderDiscount: model.orderDiscount,
        orderExtraCharges: model.orderExtraCharges,
      });

      

      const logModel = {
        orderId : newCreatedModel.id,
        user : model.log.user,
        action: model.log.action,
        type: model.log.type
      };
      await new OrderLogsRepo().create(logModel);

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

  async getByUserId(id: number): Promise<any> {
    try {

      const dbUser = await User.findOne({ where: { id: id }});
      if (!dbUser) {
        throw new Error("User not found!");
      }

      const dbModel = await CartOrder.findAll({ where: { customerId: id }});
      if (!dbModel[0]) {
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
        amount: model.amount,
        cartIdList: model.cartIdList,
        orderStatus: model.orderStatus,
        firstName: model.firstName,
        lastName: model.lastName,
        mobile: model.mobile,
        mobile2: model.mobile2,
        email: model.email,
        billing: model.billing,
        deliveryMethod: model.deliveryMethod,
        notes: model.notes,
        status: true,
        payment: model.payment,
        orderDiscount: model.orderDiscount,
        orderExtraCharges: model.orderExtraCharges,
      });
      
      const logModel = {
        orderId : newCreatedModel.id,
        user : model.log.user,
        action: model.log.action,
        type: model.log.type
      };
      await new OrderLogsRepo().create(logModel);

      if(!newCreatedModel){
        throw new Error("Failed to checkout order! | ");
      }

      
      const lastModel = await OrderInvoice.findOne({ order: [['createdAt', 'DESC']] }) as OrderInvoice;
      const invoiceNo = await generateInvoiceNo(lastModel);

      const newInv = await OrderInvoice.create({
        customerId: newCreatedModel.customerId,
        invoiceNo: invoiceNo,
        invoiceDate: new Date(),
        orderId : newCreatedModel.id
      });

      return newCreatedModel;
    } catch (err: any) {
      throw new Error("Failed to checkout order! | " + err.message);
    }
  }

  async getInvoiceByCartId(id: number): Promise<any> {
    try {
      const orderModel = await CartOrder.findOne({ where: { id: id }});
      if (!orderModel) {
        throw new Error("Data not found!");
      }

      const invoiceModel = await OrderInvoice.findOne({ where: { orderId: id }});
      if (!invoiceModel) {
        throw new Error("Data not found!");
      }

      const result = {
        invoiceNo : invoiceModel.invoiceNo,
        invoiceDate : invoiceModel.invoiceDate,
        orderDetails : orderModel
      }

      return await result;
    
    } catch (err: any) {
      throw new Error("Failed to get invoice! | " + err.message);
    }
  }

  async getByInvId(id: number): Promise<any> {
    try {
      
      const invoiceModel = await OrderInvoice.findOne({ where: { orderId: id }});
      if (!invoiceModel) {
        throw new Error("Data not found!");
      }
      const orderModel = await CartOrder.findOne({ where: { id: invoiceModel.orderId }});
      if (!orderModel) {
        throw new Error("Data not found!");
      }
      
      const result = {
        invoiceNo : invoiceModel.invoiceNo,
        invoiceDate : invoiceModel.invoiceDate,
        orderDetails : orderModel
      }

      return await result;
    
    } catch (err: any) {
      throw new Error("Failed to get invoice! | " + err.message);
    }
  }

  async getByInvNo(id: string): Promise<any> {
    try {
      
      const invoiceModel = await OrderInvoice.findOne({ where: { invoiceNo: id }});
      if (!invoiceModel) {
        throw new Error("Data not found!");
      }
      const orderModel = await CartOrder.findOne({ where: { id: invoiceModel.orderId }});
      if (!orderModel) {
        throw new Error("Data not found!");
      }
      
      const result = {
        invoiceNo : invoiceModel.invoiceNo,
        invoiceDate : invoiceModel.invoiceDate,
        orderDetails : orderModel
      }

      return await result;
    
    } catch (err: any) {
      throw new Error("Failed to get invoice! | " + err.message);
    }
  }
}
