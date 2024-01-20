import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CategoryType } from "./CategoryType";

@Table({ tableName: "LAPEL_CATEGORY",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Category extends Model {
    public static CATEGORY_TABLE_NAME = "CATEGORY" as string;
    public static CATEGORY_ID = "id" as string;
    public static CATEGORY_TYPE = "categoryType" as string;
    public static CATEGORY_NAME = "categoryName" as string;
    public static CATEGORY_DESCRIPTION = "categoryDescription" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Category.CATEGORY_ID })
    id!: number;

    @ForeignKey(() => CategoryType)
    @Column({ type: DataType.INTEGER })
    categoryType!: number;

    @Column({ type: DataType.STRING(100), field: Category.CATEGORY_NAME })
    categoryName!: string;

    @Column({ type: DataType.STRING(100), field: Category.CATEGORY_DESCRIPTION })
    categoryDescription!: string;

    // @BeforeCreate
    // @BeforeUpdate
    // static preprocessCategoryNameHook(category: Category): void {
    //     // You can add any preprocessing logic for category names before creating or updating.
    // }
}
