import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RowMaterial } from "./RowMaterial";

@Table({ tableName: "LAPEL_RELATED_ROW_MATERIAL",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class RelatedRowMaterial extends Model {
    public static RELATED_FABRIC_TABLE_NAME = "LAPEL_RELATED_ROW_MATERIAL" as string;
    public static RELATED_FABRIC_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: RelatedRowMaterial.RELATED_FABRIC_ID })
    id!: number;

    @ForeignKey(() => RowMaterial)
    @Column({ type: DataType.INTEGER })
    rowMaterialId!: number;

    @ForeignKey(() => RowMaterial)
    @Column({ type: DataType.INTEGER })
    relatedRowMaterialId!: number;
}
