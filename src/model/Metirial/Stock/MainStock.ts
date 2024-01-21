import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomId } from "../../Common/CustomId";

@Table({ tableName: "LAPEL_MATERIAL_MAIN_STOCK",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class MainStock extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, 
        autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING, unique : true})
    customId!: string;

    @Column({ type: DataType.DECIMAL, field: "mainStock" })
    mainStock!: number;

    @Column({ type: DataType.DECIMAL, field: "liveStock" })
    liveStock!: number;
    
    @Column({ type: DataType.DECIMAL, field: "pendingStock" })
    pendingStock!: number;
    
    @Column({ type: DataType.DECIMAL, field: "usedStock" })
    usedStock!: number;
    
    @Column({ type: DataType.DECIMAL, field: "totalStock" })
    totalStock!: number;
}
