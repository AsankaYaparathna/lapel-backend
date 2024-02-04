import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CstomProductPackages } from "./CstomProductPackages";
import { Image } from "../../Common/Images";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_PACKAGE_IMAGES",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class PackageImages extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CstomProductPackages)
    @Column({ type: DataType.INTEGER, field: "packageId" })
    packageId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "imageId" })
    imageId!: number;

}


