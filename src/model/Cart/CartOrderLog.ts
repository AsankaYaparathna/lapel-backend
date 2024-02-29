import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CartOrder } from "./CartOrder";

@Table({ tableName: "LAPEL_USER_CART_LOG", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class CartOrderLog extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CartOrder)
    @Column({ type: DataType.INTEGER, field: "orderId" })
    orderId!: number;

    @Column({ type: DataType.JSON, field: "user" })
    user!: { name: string; type: string};

    @Column({ type: DataType.STRING, field: "action" })
    action!: string;

    @Column({ type: DataType.JSON, field: "type" })
    type!: { str1: string, str2: string};
    
    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

}
