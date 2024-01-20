import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_MATERIAL",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Material extends Model {
    public static METIRIAL_TABLE_NAME = "LAPEL_MATERIAL" as string;
    public static METIRIAL_ID = "id" as string;
    public static METIRIAL_NAME = "name" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Material.METIRIAL_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: Material.METIRIAL_NAME })
    name!: string;

}
