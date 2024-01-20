import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { Fabric } from "./Fabric";

@Table({ tableName: "LAPEL_FABRIC_IMAGE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class FabricImages extends Model {
    public static FABRIC_IMAGE_TABLE_NAME = "LAPEL_FABRIC_IMAGE" as string;
    public static FABRIC_IMAGE_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: FabricImages.FABRIC_IMAGE_ID })
    id!: number;

    @ForeignKey(() => Fabric)
    @Column({ type: DataType.INTEGER })
    fabricId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER })
    imageId!: number;
}
