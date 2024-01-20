import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { WarehouseImage } from "./WearhouseImages";

@Table({
    tableName: "LAPEL_WAREHOUSE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Wearhouse extends Model {
    public static WAREHOUSE_TABLE_NAME = "LAPEL_WAREHOUSE" as string;
    public static WAREHOUSE_ID = "id" as string;
    public static WAREHOUSE_NAME = "name" as string;
    public static WAREHOUSE_ADDRESS = "address" as string;
    public static WAREHOUSE_CONTACT_NO = "contactNo" as string;
    public static WAREHOUSE_DESCRIPTION = "description" as string;
    public static WAREHOUSE_IMAGE_LIST = "imageList" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Wearhouse.WAREHOUSE_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: Wearhouse.WAREHOUSE_NAME })
    name!: string;

    @Column({ type: DataType.JSON, field: Wearhouse.WAREHOUSE_ADDRESS })
    address!: { no: string; street: string; city: string };

    @Column({ type: DataType.STRING(20), field: Wearhouse.WAREHOUSE_CONTACT_NO })
    contactNo!: string;

    @Column({ type: DataType.TEXT, field: Wearhouse.WAREHOUSE_DESCRIPTION })
    description!: string;

    @HasMany(() => WarehouseImage, { foreignKey: Wearhouse.WAREHOUSE_IMAGE_LIST })
    imageList!: WarehouseImage[];

}
