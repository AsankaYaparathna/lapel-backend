import { ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../User";


@Table({ 
    tableName: "LAPEL_USER_MEASUREMENT_TROUSER_COPY_FAVORITE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class TrouserCopyFavorite extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique : true, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.STRING(100), field: "nickName" })
    nickName!: string;

    @Column({ type: DataType.JSON, field: "bodyFit" })
    bodyFit!: { regularFit : boolean, slimFit : boolean, tightFit : boolean};

    @Column({ type: DataType.INTEGER, field: "seatValue" })
    seatValue!: number;

    @Column({ type: DataType.INTEGER, field: "waistValue" })
    waistValue!: number;

    @Column({ type: DataType.INTEGER, field: "trouserLengthValue" })
    trouserLengthValue!: number;

    @Column({ type: DataType.INTEGER, field: "thighValue" })
    thighValue!: number;

    @Column({ type: DataType.INTEGER, field: "kneeValue" })
    kneeValue!: number;

    @Column({ type: DataType.INTEGER, field: "bottomValue" })
    bottomValue!: number;
}


