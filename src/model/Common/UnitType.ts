import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_UNIT_TYPE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class UnitType extends Model {
    public static UNIT_TYPE_TABLE_NAME = "LAPEL_UNIT_TYPE" as string;
    public static UNIT_TYPE_ID = "id" as string;
    public static UNIT_TYPE_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: UnitType.UNIT_TYPE_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: UnitType.UNIT_TYPE_NAME })
    name!: string;
}
