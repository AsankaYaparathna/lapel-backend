import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomId } from "../../Common/CustomId";
import { Category } from "../../Common/Category/Category";

@Table({ tableName: "LAPEL_FABRIC_ITEM",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class FabricItem extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, 
        autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING })
    customId!: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId!: number;

    @Column({ type: DataType.STRING, field: "currency" })
    currency!: string;

    @Column({ type: DataType.INTEGER, field: "price" })
    price!: number;

    @Column({ type: DataType.BOOLEAN, field: "visibility" })
    visibility!: boolean;

    @Column({ type: DataType.JSON, field: "stockAlert" })
    stockAlert!: { status : boolean, value: string};

    @Column({ type: DataType.JSON, field: "levelOfSafty" })
    levelOfSafty!: { status : boolean, value: string};

    @Column({ type: DataType.JSON, field: "discount" })
    discount!: { status : boolean, fixedValue: string, fixedRate : string};
}
