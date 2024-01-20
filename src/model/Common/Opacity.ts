import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_OPACITY",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Opacity extends Model {
    public static OPACITY_TABLE_NAME = "LAPEL_OPACITY" as string;
    public static OPACITY_ID = "id" as string;
    public static OPACITY_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Opacity.OPACITY_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Opacity.OPACITY_NAME })
    name!: string;
}
