import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../Common/Category/Category";
import { CategoryType } from "../../Common/Category/CategoryType";
import { Image } from "../../Common/Images";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CstomProductPackages extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING(100), field: "title" })
    title!: string;

    @Column({ type: DataType.STRING(100), field: "description" })
    description!: string;

    @Column({ type: DataType.STRING(100), field: "productionTime" })
    productionTime!: string;

    @Column({ type: DataType.DOUBLE, field: "price" })
    price!: number;

    @Column({ type: DataType.INTEGER, field: "listingPriority" })
    listingPriority!: number;

    @Column({ type: DataType.BOOLEAN, field: "isLive" })
    isLive!: boolean;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "icon" })
    icon!: number;
    

    @ForeignKey(() => CategoryType)
    @Column({ type: DataType.STRING, field: "categoryTypeId" })
    categoryTypeId!: string;

    @Column({ type: DataType.BOOLEAN, field: "isActive" })
    isActive!: boolean;



}

