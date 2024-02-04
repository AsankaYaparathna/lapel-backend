import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../Common/Category/Category";
import { CategoryType } from "../../Common/Category/CategoryType";
import { CustomProductOption } from "./CustomProductOption";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CustomProduct extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.STRING, field: "categoryId" })
    categoryId!: string;

    @Column({ type: DataType.STRING(100), field: "categoryName" })
    categoryName!: string;

    @ForeignKey(() => CategoryType)
    @Column({ type: DataType.STRING, field: "categoryTypeId" })
    categoryTypeId!: string;

    @Column({ type: DataType.BOOLEAN, field: "isActive" })
    isActive!: boolean;

    @HasMany(() => CustomProductOption, { foreignKey:"customProductOption" })
    customProductOption!: CustomProductOption[];

}


