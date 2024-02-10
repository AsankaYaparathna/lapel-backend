import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../Common/Category/Category";
import { CategoryType } from "../../Common/Category/CategoryType";
import { CustomProduct } from "./CustomProduct";
import { Image } from "../../Common/Images";
import { OptionHidenRule } from "./OptionHidenRule";
import { SubOption } from "./SubOption";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_OPTION",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class CustomProductOption extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomProduct)
    @Column({ type: DataType.INTEGER, field: "customProductId" })
    customProductId!: number;

    @Column({ type: DataType.STRING(100), field: "name" })
    name!: string;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "image" })
    image!: number;

    @Column({ type: DataType.BOOLEAN, field: "style" })
    style!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "contrast" })
    contrast!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "accent" })
    accent!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "optionGroup" })
    optionGroup!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "hidden" })
    hidden!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "front" })
    front!: boolean;
    
    @Column({ type: DataType.BOOLEAN, field: "back" })
    back!: boolean;

    @Column({ type: DataType.TEXT, field: "description" })
    description!: string;

    @HasMany(() => OptionHidenRule, { foreignKey:"hideRules" })
    hideRules!: OptionHidenRule[];

    @ForeignKey(() => SubOption)
    @Column({ type: DataType.INTEGER, field: "defaultLoadingOption" })
    defaultLoadingOption!: number;

    @HasMany(() => SubOption, { foreignKey:"subOptions" })
    subOptions!: SubOption[];

    
    @Column({ type: DataType.INTEGER, field: "frontViewOrder" })
    frontViewOrder!: number;

    @Column({ type: DataType.INTEGER, field: "backViewOrder" })
    backViewOrder!: number;
}


