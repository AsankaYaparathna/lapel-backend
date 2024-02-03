import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SubOption } from "./SubOption";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_SUB_OPTION_HIDEN_RULE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class SubOptionHidenRule extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => SubOption)
    @Column({ type: DataType.INTEGER, field: "subOptionId" })
    subOptionId!: number;

    @ForeignKey(() => SubOption)
    @Column({ type: DataType.INTEGER, field: "ruleId" })
    ruleId!: number;
}


