import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Fabric } from "./Fabric";

@Table({ tableName: "LAPEL_RELATED_FABRIC",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class RelatedFabric extends Model {
    public static RELATED_FABRIC_TABLE_NAME = "LAPEL_RELATED_FABRIC" as string;
    public static RELATED_FABRIC_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: RelatedFabric.RELATED_FABRIC_ID })
    id!: number;

    @ForeignKey(() => Fabric)
    @Column({ type: DataType.INTEGER })
    fabricId!: number;

    @ForeignKey(() => Fabric)
    @Column({ type: DataType.INTEGER })
    relatedFabricId!: number;
}
