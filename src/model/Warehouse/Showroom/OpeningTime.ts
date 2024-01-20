import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Showroom } from "./Showroom";

@Table({ tableName: "LAPEL_SHOWROOM_OPEN_TIME",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class OpenTime extends Model {
    public static OPEN_TIME_TABLE_NAME = "LAPEL_SHOWROOM_OPEN_TIME" as string;
    public static OPEN_TIME_ID = "id" as string;
    public static OPEN_TIME_DAY = "day" as string;
    public static OPEN_TIME_FROM = "openFrom" as string;
    public static OPEN_TIME_TO = "openTo" as string;
    public static OPEN_TIME_IS_OPEN = "isOpen" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: OpenTime.OPEN_TIME_ID })
    id!: number;

    @Column({ type: DataType.STRING(20), field: OpenTime.OPEN_TIME_DAY })
    day!: string;

    @Column({ type: DataType.BOOLEAN, field: OpenTime.OPEN_TIME_IS_OPEN })
    isOpen!: boolean;

    @Column({ type: DataType.TIME, field: OpenTime.OPEN_TIME_FROM })
    openFrom!: string;

    @Column({ type: DataType.TIME, field: OpenTime.OPEN_TIME_TO })
    openTo!: string;

    @ForeignKey(() => Showroom)
    @Column({ type: DataType.INTEGER })
    showroomId!: number;
}
