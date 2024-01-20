import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_WEIGHT",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Weight extends Model {
    public static WEIGHT_TABLE_NAME = "LAPEL_WEIGHT" as string;
    public static WEIGHT_ID = "id" as string;
    public static WEIGHT_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Weight.WEIGHT_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Weight.WEIGHT_NAME })
    name!: string;
}
