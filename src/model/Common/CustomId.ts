import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_CUSTOM_ID",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CustomId extends Model {
    @Column({ type: DataType.STRING(100), primaryKey: true, field: "customId" })
    customId!: string;

    @Column({ type: DataType.STRING(100), field: "referanceTable" })
    referanceTable!: string;
}
