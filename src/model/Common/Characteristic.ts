import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_CHARACTERISTICS",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Characteristics extends Model {
    public static CHARACTERISTICS_TABLE_NAME = "LAPEL_CHARACTERISTICS" as string;
    public static CHARACTERISTICS_ID = "id" as string;
    public static CHARACTERISTICS_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Characteristics.CHARACTERISTICS_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Characteristics.CHARACTERISTICS_NAME })
    name!: string;

}
