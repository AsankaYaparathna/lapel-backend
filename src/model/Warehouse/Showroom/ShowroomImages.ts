import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { Showroom } from "./Showroom";

@Table({ tableName: "LAPEL_SHOWROOM_IMAGE",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class ShowroomImages extends Model {
    public static SHOWROOM_IMAGE_ID = "id" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: ShowroomImages.SHOWROOM_IMAGE_ID })
    id!: number;

    @ForeignKey(() => Showroom)
    @Column({ type: DataType.INTEGER })
    showroomId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER })
    imageId!: number;
}
