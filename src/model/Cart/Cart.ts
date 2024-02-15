import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CstomProductPackages } from "../Product/Packages/CstomProductPackages";
import { User } from "../Customer/User";

@Table({ tableName: "LAPEL_USER_CART", timestamps: true, updatedAt: 'updatedAt', createdAt: 'createdAt' })

export class Cart extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: "customerId" })
    customerId!: number;

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

    @Column({ type: DataType.STRING, field: "name" })
    name!: string;

    @Column({ type: DataType.JSON, field: "measurement" })
    measurement!: measurementList[];

    @Column({ type: DataType.STRING, field: "note" })
    note!: string;

    @Column({ type: DataType.STRING, field: "noteImageUrl" })
    noteImageUrl!: string;

    @Column({ type: DataType.BOOLEAN, field: "status" })
    status!: boolean;

    @Column({ type: DataType.JSON, field: "styleList" })
    styleList!: StyleListItem[];
}

interface optionItem { optionId: number; subOptionId: number; }
interface StyleListItem { customProductId: number; optionItem: optionItem[]; }
interface measurement { id : number; type : string; option: string; }
interface measurementList { customProductId: number; measurement: measurement; }

