import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_SERIES",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Series extends Model {
    public static SERIES_TABLE_NAME = "LAPEL_SERIES" as string;
    public static SERIES_ID = "id" as string;
    public static SERIES_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Series.SERIES_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Series.SERIES_NAME })
    name!: string;
}
