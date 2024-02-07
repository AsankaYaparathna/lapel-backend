import { ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../../User";


@Table({ 
    tableName: "LAPEL_USER_MEASUREMENT_WAISTCOAT_BODY",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class WaistcoatBodyMeasurement extends Model {

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

    @Column({ type: DataType.JSON, field: "bodyFit" })
    bodyFit!: { regularFit : boolean, slimFit : boolean, tightFit : boolean};

    @Column({ type: DataType.INTEGER, field: "neckValue" })
    neckValue!: number;

    @Column({ type: DataType.INTEGER, field: "chestValue" })
    chestValue!: number;

    @Column({ type: DataType.INTEGER, field: "stomachValue" })
    stomachValue!: number;

    @Column({ type: DataType.INTEGER, field: "shouldersValue" })
    shouldersValue!: number;

    @Column({ type: DataType.INTEGER, field: "waistCoatLengthValue" })
    waistCoatLengthValue!: number;
}


