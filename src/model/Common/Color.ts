import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_COLOR",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Color extends Model {
    public static COLOR_TABLE_NAME = "LAPEL_COLOR" as string;
    public static COLOR_ID = "id" as string;
    public static COLOR_CODE = "colorCode" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Color.COLOR_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Color.COLOR_CODE })
    colorCode!: string;

}
