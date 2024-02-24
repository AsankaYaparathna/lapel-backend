import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CartOrder } from "./CartOrder";
import { User } from "../Customer/User";

@Table({ tableName: "LAPEL_USER_CART_ORDER_INVOICE", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class OrderInvoice extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING, unique: true, field: "invoiceNo" })
    invoiceNo!: string;

    @Column({ type: DataType.DATE, unique: true, field: "invoiceDate" })
    invoiceDate!: string;

    @ForeignKey(() => CartOrder)
    @Column({ type: DataType.INTEGER, unique : true, field: "orderId" })
    orderId!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: "customerId" })
    customerId!: number;
    
    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

}
