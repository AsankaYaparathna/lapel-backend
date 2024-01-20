import { BeforeCreate, BeforeUpdate, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./Category";

@Table({ tableName: "LAPEL_SUB_CATEGORY",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class SubCategory extends Model {
    public static SUBCATEGORY_TABLE_NAME = "LAPEL_SUB_CATEGORY" as string;
    public static SUBCATEGORY_ID = "id" as string;
    public static SUBCATEGORY_NAME = "subcategoryName" as string;
    public static SUBCATEGORY_DESCRIPTION = "subcategoryDescription" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: SubCategory.SUBCATEGORY_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: SubCategory.SUBCATEGORY_NAME })
    subcategoryName!: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId!: number;

    @Column({ type: DataType.STRING(100), field: SubCategory.SUBCATEGORY_DESCRIPTION })
    subcategoryDescription!: string;

}
