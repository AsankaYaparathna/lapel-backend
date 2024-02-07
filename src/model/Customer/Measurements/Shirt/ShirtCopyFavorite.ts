import { ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../User";


@Table({ 
    tableName: "LAPEL_USER_MEASUREMENT_SHIRT_COPY_FAVORITE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class ShirtCopyFavorite extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique : true, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.STRING(100), field: "nickName" })
    nickName!: string;

    @Column({ type: DataType.JSON, field: "bodyFit" })
    bodyFit!: { regularFit : boolean, slimFit : boolean, tightFit : boolean};

    @Column({ type: DataType.INTEGER, field: "neckValue" })
    neckValue!: number;

    @Column({ type: DataType.INTEGER, field: "lengthValue" })
    lengthValue!: number;

    @Column({ type: DataType.INTEGER, field: "chestValue" })
    chestValue!: number;

    @Column({ type: DataType.INTEGER, field: "stomachValue" })
    stomachValue!: number;

    @Column({ type: DataType.INTEGER, field: "seatValue" })
    seatValue!: number;

    @Column({ type: DataType.INTEGER, field: "shouldersValue" })
    shouldersValue!: number;

    @Column({ type: DataType.INTEGER, field: "sleeveLengthValue" })
    sleeveLengthValue!: number;

    @Column({ type: DataType.INTEGER, field: "bicepsValue" })
    bicepsValue!: number;

    @Column({ type: DataType.INTEGER, field: "wristValue" })
    wristValue!: number;

}


