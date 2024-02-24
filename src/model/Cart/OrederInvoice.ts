import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../Customer/User";
import { CartOrder } from "./CartOrder";

@Table({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class OrederInvoice extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING, unique: true, field: "invoiceNo" })
    invoiceNo!: string;

    @Column({ type: DataType.DATE, unique: true, field: "date" })
    date!: string;

    @ForeignKey(() => CartOrder)
    @Column({ type: DataType.INTEGER, unique : true, field: "orderId" })
    orderId!: number;
    
    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

}

interface cartId { cartId: number;}
interface cartIdList { cartIdList: cartId[]; }
interface pickupMode { pickupDate : Date; showroomId : number; }
interface delivery { name: string; contactNumber: string; sameAsBilling : boolean; address1 : string; address2 : string; zipCode : string; city : string;}
interface shippedMode { deliverDate : Date; name : string; contactNumber : string; delivery : delivery}
interface deliveryMethod { deliveryMethod: string; pickupMode: pickupMode; shippedMode: shippedMode; }
interface payment { paymentStatus: string; paymentMethod: string; transactionId: string; transactionDate: Date }

