import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { OpenTime } from "./OpeningTime";
import { ShowroomImages } from "./ShowroomImages";

@Table({
    tableName: "LAPEL_SHOWROOM",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Showroom extends Model {
    public static SHOWROOM_TABLE_NAME = "LAPEL_SHOWROOM" as string;
    public static SHOWROOM_ID = "id" as string;
    public static SHOWROOM_NAME = "name" as string;
    public static SHOWROOM_ADDRESS = "address" as string;
    public static SHOWROOM_GOOGLE_LOCATION = "googleLocation" as string;
    public static SHOWROOM_CONTACT_NO = "contactNo" as string;
    public static SHOWROOM_DESCRIPTION = "description" as string;
    public static SHOWROOM_IMAGE_LIST = "imageList" as string;
    public static SHOWROOM_OPEN_TIME = "timeList" as string; 
    public static SHOWROOM_IS_LIVE = "isLive" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Showroom.SHOWROOM_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: Showroom.SHOWROOM_NAME })
    name!: string;

    @Column({ type: DataType.JSON, field: Showroom.SHOWROOM_ADDRESS })
    address!: { no: string; street: string; city: string };

    @Column({ type: DataType.STRING(255), field: Showroom.SHOWROOM_GOOGLE_LOCATION })
    googleLocation!: string;

    @Column({ type: DataType.JSON, field: Showroom.SHOWROOM_CONTACT_NO })
    contactNo!: { no1: string; no2: string};

    @Column({ type: DataType.TEXT, field: Showroom.SHOWROOM_DESCRIPTION })
    description!: string;

    @Column({ type: DataType.BOOLEAN, field: Showroom.SHOWROOM_IS_LIVE })
    isLive!: boolean;

    @HasMany(() => ShowroomImages, { foreignKey: Showroom.SHOWROOM_IMAGE_LIST })
    imageList!: ShowroomImages[];

    @HasMany(() => OpenTime, { foreignKey: Showroom.SHOWROOM_OPEN_TIME })
    timeList!: OpenTime[];
}
