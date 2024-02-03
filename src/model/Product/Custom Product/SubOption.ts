import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CustomProductOption } from "./CustomProductOption";
import { Image } from "../../Common/Images";
import { SubOptionHidenRule } from "./SubOptionHidenRule";
import { SubOptionFabric } from "./SubOptionFabric";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_SUB_OPTION",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class SubOption extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomProductOption)
    @Column({ type: DataType.INTEGER, field: "optionId" })
    optionId!: number;

    @Column({ type: DataType.STRING(100), field: "title" })
    title!: string;

    @Column({ type: DataType.DOUBLE, field: "price" })
    price!: number;

    @Column({ type: DataType.BOOLEAN, field: "viewStockItem" })
    viewStockItem!: boolean;

    @Column({ type: DataType.STRING(100), field: "description" })
    description!: string;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "image1" })
    image1!: number;
    
    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "image2" })
    image2!: number;

    @HasMany(() => SubOptionHidenRule, { foreignKey:"hideRules" })
    hideRules!: SubOptionHidenRule[];

    @HasMany(() => SubOptionFabric, { foreignKey:"fabric" })
    fabric!: SubOptionFabric[];
}


