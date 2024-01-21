import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { Category } from "../../Common/Category/Category";
import { SubCategory } from "../../Common/Category/SubCategory";
import { UnitType } from "../../Common/UnitType";
import { Supplier } from "../Supplier/Supplier";
import { CustomId } from "../../Common/CustomId";

@Table({
    tableName: "LAPEL_ROW_MATERIAL",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class RowMaterial extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id"})
    id!: number;

    @Column({ type: DataType.STRING(100), field: "name" })
    name!: string;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING, field: "customId" })
    customId!: string;

    @Column({ type: DataType.TEXT, field: "description" })
    description!: string;

    @Column({ type: DataType.TEXT, field: "information" })
    information!: string;

    @ForeignKey(() => Supplier)
    @Column({ type: DataType.INTEGER, field: "supplierId" })
    supplierId!: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, field: "categoryId" })
    categoryId!: number;

    @ForeignKey(() => SubCategory)
    @Column({ type: DataType.INTEGER, field: "subCategoryId" })
    subCategoryId!: number;

    @ForeignKey(() => UnitType)
    @Column({ type: DataType.INTEGER, field: "unitTypeId" })
    unitTypeId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "qr" })
    qr!: number;

    @Column({ type: DataType.JSON, field: "levelOfSafty" })
    levelOfSafty!: { status : boolean, value : string };

    @Column({ type: DataType.JSON, field: "discount" })
    discount!: { status : boolean, fixedValue: string, fixedRate : string};

    @Column({ type: DataType.JSON, field: "stockAlert" })
    stockAlert!: { status : boolean, value : string };

    @Column({ type: DataType.BOOLEAN, field: "featured" })
    featured!: boolean;

    @Column({ type: DataType.BOOLEAN, field: "live" })
    live!: boolean;

    @Column({ type: DataType.JSON, field: "stockMinus" })
    stockMinus!: { status : boolean, value : string };
}
