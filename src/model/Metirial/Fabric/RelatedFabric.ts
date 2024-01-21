import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Fabric } from "./Fabric";

@Table({ tableName: "LAPEL_RELATED_FABRIC",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class RelatedFabric extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => Fabric)
    @Column({ type: DataType.INTEGER })
    fabricId!: number;

    @ForeignKey(() => Fabric)
    @Column({ type: DataType.INTEGER })
    relatedFabricId!: number;
}
