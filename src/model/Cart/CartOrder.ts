import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CstomProductPackages } from "../Product/Packages/CstomProductPackages";
import { User } from "../Customer/User";

@Table({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class CartOrder extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.INTEGER, field: "noOfItems" })
    noOfItems!: number;

    @Column({ type: DataType.DECIMAL(10, 2), field: "subTotal" })
    subTotal!: number;

    @Column({ type: DataType.DECIMAL(10, 2), field: "balance" })
    balance!: number;

    @Column({ type: DataType.DECIMAL(10, 2), field: "shippingCost" })
    shippingCost!: number;

    @Column({ type: DataType.DECIMAL(10, 2), field: "totalAmmount" })
    totalAmmount!: number;

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

    @Column({ type: DataType.BOOLEAN, field: "orderStatus" })
    orderStatus!: string;

    @Column({ type: DataType.JSON, field: "cartIdList" })
    cartIdList!: cartIdList[];   

    @Column({ type: DataType.JSON, field: "payment" })
    payment!: payment;   
}

interface cartId { cartId: number;}
interface cartIdList { cartIdList: cartId[]; }
interface pickupMode { pickupDate : Date; showroomId : number; }
interface delivery { name: string; contactNumber: string; sameAsBilling : boolean; address1 : string; address2 : string; zipCode : string; city : string;}
interface shippedMode { deliverDate : Date; name : string; contactNumber : string; delivery : delivery}
interface deliveryMethod { deliveryMethod: string; pickupMode: pickupMode; shippedMode: shippedMode; }
interface payment { paymentStatus: string; paymentMethod: string; transactionId: string; transactionDate: Date }

