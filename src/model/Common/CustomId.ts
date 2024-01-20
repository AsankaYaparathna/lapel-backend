import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_CUSTOM_ID",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CustomId extends Model {
    public static CUSTOM_TABLE_NAME = "LAPEL_CUSTOM_ID" as string;
    public static CUSTOM_ID = "customId" as string;
    public static CUSTOM_ID_TABLE = "customId" as string;

    @Column({ type: DataType.STRING(100), primaryKey: true, field: CustomId.CUSTOM_ID })
    customId!: string;

    @Column({ type: DataType.STRING(100), field: CustomId.CUSTOM_ID_TABLE })
    referanceTable!: string;
}
