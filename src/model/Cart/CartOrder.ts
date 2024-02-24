import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../Customer/User";

@Table({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class CartOrder extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.STRING, field: "firstName" })
    firstName!: string;

    @Column({ type: DataType.STRING, field: "lastName" })
    lastName!: string;

    @Column({ type: DataType.STRING, field: "mobile" })
    mobile!: string;

    @Column({ type: DataType.STRING, field: "mobile2" })
    mobile2!: string;

    @Column({ type: DataType.STRING, field: "email" })
    email!: string;

    @Column({ type: DataType.JSON, field: "billing" })
    billing!: { address1 : string, address2 : string, zipCode : string, city : string};

    @Column({ type: DataType.JSON, field: "deliveryMethod" })
    deliveryMethod!: deliveryMethod;

    @Column({ type: DataType.STRING, field: "notes" })
    notes!: string;

    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

    @Column({ type: DataType.STRING, field: "orderStatus" })
    orderStatus!: string;

    @Column({ type: DataType.JSON, field: "cartIdList" })
    cartIdList!: cartIdList[];   

    @Column({ type: DataType.JSON, field: "payment" })
    payment!: payment;

    @Column({ type: DataType.JSON, field: "amount" })
    amount!: amount;
}

interface cartId { cartId: number; discount : discount, extraCharges : extraCharges[]}
interface cartIdList { cartIdList: cartId[]; };
interface pickupMode { pickupDate : Date; showroomId : number; };
interface delivery { name: string; contactNumber: string; sameAsBilling : boolean; address1 : string; address2 : string; zipCode : string; city : string;};
interface shippedMode { deliverDate : Date; name : string; contactNumber : string; delivery : delivery};
interface deliveryMethod { deliveryMethod: string; pickupMode: pickupMode; shippedMode: shippedMode; };
interface payment { paymentStatus: string; paymentMethod: string; transactionId: string; transactionDate: Date };
interface discount { 
    ammount: number; 
    type: string; // Rs, % 
    description: string 
};
interface extraCharges { 
    ammount: number; 
    type: string; // Rs, % 
    description: string 
};
interface amount { 
    subTotal: number;
    shippingCost: number;
    totalDiscount: number;
    storeCredit: number; 
    totalExtraCharges: number;
    totalAmmount: number; // subTotal+shippingCost+totalExtraCharges
    payAmount: number; //totalAmmount-totalDiscount-storeCredit
    halfPayment: number
    balance: number;
};

