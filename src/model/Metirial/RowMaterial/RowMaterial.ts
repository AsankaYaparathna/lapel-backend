import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { Category } from "../../Common/Category/Category";
import { SubCategory } from "../../Common/Category/SubCategory";
import { UnitType } from "../../Common/UnitType";
import { Supplier } from "../Supplier/Supplier";

@Table({
    tableName: "LAPEL_ROW_MATERIAL",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class RowMaterial extends Model {
    public static ROW_MATERIAL_TABLE_NAME = "LAPEL_ROW_MATERIAL" as string;
    public static ROW_MATERIAL_ID = "id" as string;
    public static ROW_MATERIAL_NAME = "name" as string;
    public static ROW_MATERIAL_CUSTOM_ID = "customId" as string;
    public static ROW_MATERIAL_DESCRIPTION = "description" as string;
    public static ROW_MATERIAL_INFORMATION = "information" as string;
    public static ROW_MATERIAL_SUPPLIER = "supplier" as string;
    public static ROW_MATERIAL_CATEGORY = "category" as string;
    public static ROW_MATERIAL_SUB_CATEGORY = "subCategory" as string;
    public static ROW_MATERIAL_UNIT = "unit" as string;
    public static ROW_MATERIAL_QR = "qr" as string;
    public static ROW_MATERIAL_PRODUCT_IMAGE_LIST = "productImageList" as string;
    public static ROW_MATERIAL_LEVEL_OF_SAFETY = "levelOfSafety" as string;
    public static ROW_MATERIAL_DISCOUNT = "discount" as string;
    public static ROW_MATERIAL_STOCK_ALERT = "stockAlert" as string;
    public static ROW_MATERIAL_FEATURED = "featured" as string;
    public static ROW_MATERIAL_LIVE = "live" as string;
    public static ROW_MATERIAL_STOCK = "stock" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: RowMaterial.ROW_MATERIAL_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: RowMaterial.ROW_MATERIAL_NAME })
    name!: string;

    @Column({ type: DataType.STRING(50), unique: true, field: RowMaterial.ROW_MATERIAL_CUSTOM_ID })
    customId!: string;

    @Column({ type: DataType.TEXT, field: RowMaterial.ROW_MATERIAL_DESCRIPTION })
    description!: string;

    @Column({ type: DataType.TEXT, field: RowMaterial.ROW_MATERIAL_INFORMATION })
    information!: string;

    @ForeignKey(() => Supplier)
    @Column({ type: DataType.INTEGER, field: RowMaterial.ROW_MATERIAL_SUPPLIER })
    supplierId!: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, field: RowMaterial.ROW_MATERIAL_CATEGORY })
    categoryId!: number;

    @ForeignKey(() => SubCategory)
    @Column({ type: DataType.INTEGER, field: RowMaterial.ROW_MATERIAL_SUB_CATEGORY })
    subCategoryId!: number;

    @ForeignKey(() => UnitType)
    @Column({ type: DataType.INTEGER, field: RowMaterial.ROW_MATERIAL_UNIT })
    unitTypeId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: RowMaterial.ROW_MATERIAL_QR })
    qr!: number;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_LEVEL_OF_SAFETY })
    levelOfSafety!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_DISCOUNT })
    discount!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_STOCK_ALERT })
    stockAlert!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_FEATURED })
    featured!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_LIVE })
    live!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_STOCK })
    stock!: boolean;

    @Column({ type: DataType.BOOLEAN, field: RowMaterial.ROW_MATERIAL_STOCK })
    stockValue!: boolean;
}
