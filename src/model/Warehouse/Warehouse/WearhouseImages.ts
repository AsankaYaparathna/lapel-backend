import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { Wearhouse } from "./Wearhouse";

@Table({ tableName: "LAPEL_WAREHOUSE_IMAGE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class WarehouseImage extends Model {
    public static WAREHOUSE_IMAGE_TABLE_NAME = "LAPEL_WAREHOUSE_IMAGE" as string;
    public static WAREHOUSE_IMAGE_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: WarehouseImage.WAREHOUSE_IMAGE_ID })
    id!: number;

    @ForeignKey(() => Wearhouse)
    @Column({ type: DataType.INTEGER })
    warehouseId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER })
    imageId!: number;
    
}
