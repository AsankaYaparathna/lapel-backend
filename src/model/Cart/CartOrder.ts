import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CstomProductPackages } from "../Product/Packages/CstomProductPackages";
import { User } from "../Customer/User";
import { Cart } from "./Cart";

@Table({ tableName: "LAPEL_USER_CART_ORDER", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class CartOrder extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => Cart)
    @Column({ type: DataType.INTEGER, field: "cartId" })
    cartId!: number;

    @ForeignKey(() => CstomProductPackages)
    @Column({ type: DataType.INTEGER, field: "packageId" })
    packageId!: number;

    @Column({ type: DataType.INTEGER, field: "noOfItems" })
    noOfItems!: number;

    @Column({ type: DataType.DECIMAL(10, 2), field: "subTotal" })
    subTotal!: number;

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

    @Column({ type: DataType.STRING, field: "note" })
    note!: string;

    @Column({ type: DataType.STRING, field: "noteImageUrl" })
    noteImageUrl!: string;

    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

    @Column({ type: DataType.JSON, field: "cartIdList" })
    cartIdList!: cartIdList[];
}

interface cartId { cartId: number;}
interface cartIdList { cartIdList: cartId[]; }
interface measurement { id : number; type : string; option: string; }
interface measurementList { customProductId: number; measurement: measurement; }

