import { BeforeCreate, BeforeUpdate, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../User";


@Table({ 
    tableName: "LAPEL_USER_MEASUREMENT_WAISTCOAT_STANDARD_SIZE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class WaistcoatStandardSize extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique : true, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.STRING(100), field: "nickName" })
    nickName!: string;

    @Column({ type: DataType.JSON, field: "bodyFit" })
    bodyFit!: { regularFit : boolean, slimFit : boolean, tightFit : boolean};

    @Column({ type: DataType.STRING, field: "size" })
    size!: string;
}


