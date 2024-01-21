import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "LAPEL_SUPPLIER",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Supplier extends Model {
    public static SUPPLIER_TABLE_NAME = "LAPEL_SUPPLIER" as string;
    public static SUPPLIER_ID = "id" as string;
    public static SUPPLIER_NAME = "name" as string;
    public static SUPPLIER_DESCRIPTION = "description" as string;
    public static SUPPLIER_CONTACT_NO = "contactNo" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Supplier.SUPPLIER_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: Supplier.SUPPLIER_NAME })
    name!: string;

    @Column({ type: DataType.TEXT, field: Supplier.SUPPLIER_DESCRIPTION })
    description!: string;

    @Column({ type: DataType.STRING(20), field: Supplier.SUPPLIER_CONTACT_NO })
    contactNo!: string;

}
