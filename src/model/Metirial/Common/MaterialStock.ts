import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Wearhouse } from "../../Warehouse/Warehouse/Wearhouse";
import { Showroom } from "../../Warehouse/Showroom/Showroom";

@Table({ tableName: "LAPEL_MATERIAL_STOCK",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class MaterialStock extends Model {
    public static ID = "id" as string;
    public static VALUE = "value" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: MaterialStock.ID })
    id!: number;

    @ForeignKey(() => Wearhouse)
    @Column({ type: DataType.INTEGER, allowNull: true })
    wearhouseId!: number | null;

    @ForeignKey(() => Showroom)
    @Column({ type: DataType.INTEGER, allowNull: true })
    showroomId!: number | null;

    @Column({ type: DataType.INTEGER, field: MaterialStock.VALUE })
    value!: number;
}
