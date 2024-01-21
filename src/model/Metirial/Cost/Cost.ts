import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomId } from "../../Common/CustomId";

@Table({ tableName: "LAPEL_MATERIAL_COST",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Cost extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, 
        autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING, unique : true})
    customId!: string;

    @Column({ type: DataType.DECIMAL, field: "totalUnit" })
    totalUnit!: number;

    @Column({ type: DataType.DECIMAL, field: "unitCost" })
    unitCost!: number;
    
    @Column({ type: DataType.DECIMAL, field: "totalCost" })
    totalCost!: number;
}
