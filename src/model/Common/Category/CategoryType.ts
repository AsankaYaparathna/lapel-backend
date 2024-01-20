import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "LAPEL_CATEGORY_TYPE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CategoryType extends Model {
    public static CATEGORY_TYPE_TABLE_NAME = "LAPEL_CATEGORY_TYPE" as string;
    public static CATEGORY_TYPE_ID = "id" as string;
    public static CATEGORY_TYPE_NAME = "typeName" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: CategoryType.CATEGORY_TYPE_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), unique: true, field: CategoryType.CATEGORY_TYPE_NAME })
    typeName!: string;

}
