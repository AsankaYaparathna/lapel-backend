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
import { Supplier } from "../Supplier/Supplier";

@Table({ 
    tableName: "LAPEL_FABRIC",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})
export class Fabric extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING(100), field: "name" })
    name!: string;

    @ForeignKey(() => CustomId)
    @Column({ type: DataType.STRING })
    customId!: string;

    @Column({ type: DataType.TEXT, field: "description" })
    description!: string;

    @Column({ type: DataType.TEXT, field: "information" })
    information!: string;
    
    @Column({ type: DataType.INTEGER, field: "listingPriority" })
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
    @Column({ type: DataType.INTEGER, field: "icon" })
    icon!: number;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "qr" })
    qr!: number;

    @Column({ type: DataType.JSON, field: "levelOfSafty" })
    levelOfSafty!: { status : boolean, value : string };

    @Column({ type: DataType.JSON, field: "stockAlert" })
    stockAlert!: { status : boolean, value : string };

    @Column({ type: DataType.BOOLEAN, field: "featured" })
    featured!: boolean;

    @Column({ type: DataType.BOOLEAN, field: "live" })
    live!: boolean;

    @Column({ type: DataType.JSON, field: "stockMinus" })
    stockMinus!: { status : boolean, value : string };

    @ForeignKey(() => Supplier)
    @Column({ type: DataType.INTEGER, field: "supplierId" })
    supplierId!: number;
}
