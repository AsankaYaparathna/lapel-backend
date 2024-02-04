import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CstomProductPackages } from "./CstomProductPackages";
import { CustomProductOption } from "../Custom Product/CustomProductOption";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_PACKAGE_MEASUREMENT",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class MeasurementPackage extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CstomProductPackages)
    @Column({ type: DataType.INTEGER, field: "packageId" })
    packageId!: number;

    @ForeignKey(() => CustomProductOption)
    @Column({ type: DataType.INTEGER, field: "optionId" })
    optionId!: number;
}


