import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Image } from "../../Common/Images";
import { RelatedFabric } from "./RelatedFabric";
import { Color } from "../../Common/Color";
import { Pattern } from "../../Common/Pattern";
import { Material } from "../../Common/Material";
import { Characteristics } from "../../Common/Characteristic";
import { Series } from "../../Common/Series";
import { Opacity } from "../../Common/Opacity";
import { Weight } from "../../Common/Weight";
import { UnitType } from "../../Common/UnitType";
import { CustomId } from "../../Common/CustomId";

@Table({ 
    tableName: "LAPEL_FABRIC",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Fabric extends Model {
    public static FABRIC_TABLE_NAME = "LAPEL_FABRIC" as string;
    public static FABRIC_ID = "id" as string;
    public static FABRIC_NAME = "name" as string;
    public static FABRIC_CUSTOM_ID = "customId" as string;
    public static FABRIC_DESCRIPTION = "description" as string;
    public static FABRIC_INFORMATION = "information" as string;
    public static FABRIC_WEIGHT = "weight" as string;
    public static FABRIC_LISTING_PRIORITY = "listingPriority" as string;
    public static FABRIC_ICON = "icon" as string;
    public static FABRIC_QR = "qr" as string;
    public static FABRIC_IMAGE_LIST = "imageList" as string;
    public static FABRIC_RELATED_LIST = "relatedList" as string;
    public static FABRIC_STOCK_ALERT = "stockAlert" as string;
    public static FABRIC_STOCK_ALERT_VALUE = "stockAlertValue" as string;
    public static FABRIC_FEATURED = "featured" as string;
    public static FABRIC_LIVE = "live" as string;
    public static FABRIC_STOCK = "stock" as string;
    public static FABRIC_STOCK_VALUE = "stockValue" as string;
    public static FABRIC_LEVEL_OF_SAFTY = "levelOfSafty" as string;
    public static FABRIC_LEVEL_OF_SAFTY_VALUE = "levelOfSaftyValue" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Fabric.FABRIC_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: Fabric.FABRIC_NAME })
    name!: string;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.INTEGER })
    customId!: string;

    @Column({ type: DataType.TEXT, field: Fabric.FABRIC_DESCRIPTION })
    description!: string;

    @Column({ type: DataType.TEXT, field: Fabric.FABRIC_INFORMATION })
    information!: string;
    
    @Column({ type: DataType.TEXT, field: Fabric.FABRIC_LISTING_PRIORITY })
    listingPriority!: number;

    @ForeignKey(() => Color)
    @Column({ type: DataType.INTEGER })
    colorId!: number;

    @ForeignKey(() => Pattern)
    @Column({ type: DataType.INTEGER })
    patterrnId!: number;

    @ForeignKey(() => Material)
    @Column({ type: DataType.INTEGER })
    materialId!: number;

    @ForeignKey(() => Characteristics)
    @Column({ type: DataType.INTEGER })
    characteristicsId!: number;

    @ForeignKey(() => Series)
    @Column({ type: DataType.INTEGER })
    seriesId!: number;

    @ForeignKey(() => Opacity)
    @Column({ type: DataType.INTEGER })
    opacity!: number;

    @ForeignKey(() => Weight)
    @Column({ type: DataType.INTEGER })
    weightId!: number;

    @ForeignKey(() => UnitType)
    @Column({ type: DataType.INTEGER })
    unitTypeId!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: Fabric.FABRIC_ICON })
    icon!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: Fabric.FABRIC_QR })
    qr!: number;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_LEVEL_OF_SAFTY })
    levelOfSafty!: boolean;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_LEVEL_OF_SAFTY_VALUE })
    levelOfSaftyValue!: number;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_STOCK_ALERT })
    isStockAlert!: boolean;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_STOCK_ALERT_VALUE })
    stockAlertValue!: number;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_FEATURED })
    featured!: boolean;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_LIVE })
    live!: boolean;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_STOCK })
    stock!: boolean;

    @Column({ type: DataType.BOOLEAN, field: Fabric.FABRIC_STOCK_VALUE })
    stockValue!: number;


}
