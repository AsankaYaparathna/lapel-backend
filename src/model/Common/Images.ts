import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "LAPEL_IMAGE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Image extends Model {
    public static IMAGE_TABLE_NAME = "LAPEL_IMAGE" as string;
    public static IMAGE_ID = "id" as string;
    public static IMAGE_NAME = "imageName" as string;
    public static IMAGE_DATA = "imageData" as string;
    public static IMAGE_URL = "imageURL" as string;
    public static IMAGE_LOCATION = "imagelocation" as string;
    public static IMAGE_DESCRIPTION = "imageDescription" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Image.IMAGE_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: Image.IMAGE_NAME })
    imageName!: string;

    @Column({ type: DataType.BLOB('long'), field: Image.IMAGE_DATA })
    imageData!: Buffer;

    @Column({ type: DataType.TEXT('long'), field: Image.IMAGE_URL })
    imageURL!: string;

    @Column({ type: DataType.TEXT('long'), field: Image.IMAGE_LOCATION })
    imagelocation!: string;

    @Column({ type: DataType.TEXT, field: Image.IMAGE_DESCRIPTION })
    imageDescription!: string;
}
