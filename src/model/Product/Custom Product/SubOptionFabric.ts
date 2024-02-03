import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SubOption } from "./SubOption";
import { CustomId } from "../../Common/CustomId";
import { Image } from "../../Common/Images";

@Table({ tableName: "LAPEL_CUSTOM_PRODUCT_SUB_OPTION_FABRIC",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class SubOptionFabric extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => SubOption)
    @Column({ type: DataType.INTEGER, field: "subOptionId" })
    subOptionId!: number;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING, field: "customId" })
    customId!: string;
    
    @Column({ type: DataType.STRING(100), field: "name" })
    name!: string;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "front" })
    front!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "frontFull" })
    frontFull!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "back" })
    back!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "backFull" })
    backFull!: number;

}


