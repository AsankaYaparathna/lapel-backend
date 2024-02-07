import { ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../User";


@Table({ 
    tableName: "LAPEL_USER_MEASUREMENT_TROUSER_BODY",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class TrouserBodyMeasurement extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, unique : true, field: "customerId" })
    customerId!: number;

    @Column({ type: DataType.STRING(100), field: "nickName" })
    nickName!: string;

    @Column({ type: DataType.JSON, field: "unit" })
    unit!: { metricUnits : boolean, imperialUnits : boolean};

    @Column({ type: DataType.JSON, field: "height" })
    height!: { value : string, unitType : string};

    @Column({ type: DataType.JSON, field: "weight" })
    weight!: { value : string, unitType : string};

    @Column({ type: DataType.JSON, field: "age" })
    age!: { value : string, unitType : string};

    @Column({ type: DataType.JSON, field: "waist" })
    waist!: { lowWaist : boolean, normalWaist : boolean, highWaist : boolean};

    @Column({ type: DataType.JSON, field: "seat" })
    seat!: { thin : boolean, normal : boolean, large : boolean};

    @Column({ type: DataType.JSON, field: "length" })
    length!: { noBreak : boolean, breack : boolean, halfBreak : boolean, fullBreak : boolean};

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


