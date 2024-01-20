import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_PATTERN",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Pattern extends Model {
    public static PATTERN_TABLE_NAME = "LAPEL_PATTERN" as string;
    public static PATTERN_ID = "id" as string;
    public static PATTERN_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Pattern.PATTERN_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Pattern.PATTERN_NAME })
    name!: string;

}
