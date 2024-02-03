import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomProductOption } from "./CustomProductOption";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_OPTION_HIDEN_RULE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class OptionHidenRule extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomProductOption)
    @Column({ type: DataType.INTEGER, field: "optionId" })
    optionId!: number;

    @ForeignKey(() => CustomProductOption)
    @Column({ type: DataType.INTEGER, field: "ruleId" })
    ruleId!: number;

}


