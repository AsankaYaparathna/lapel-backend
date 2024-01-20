import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { RowMaterial } from "./RowMaterial";

@Table({ tableName: "LAPEL_ROW_METERIAL_IMAGE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class RowMaterialImages extends Model {
    public static FABRIC_IMAGE_TABLE_NAME = "LAPEL_ROW_METERIAL_IMAGE" as string;
    public static FABRIC_IMAGE_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: RowMaterialImages.FABRIC_IMAGE_ID })
    id!: number;

    @ForeignKey(() => RowMaterial)
    @Column({ type: DataType.INTEGER })
    rowMaterialId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER })
    imageId!: number;
}
