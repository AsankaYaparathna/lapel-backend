import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../model/Customer/User";
import { Auth } from "../model/Auth/Auth";
import { Image } from "../model/Common/Images";
import { Category } from "../model/Common/Category/Category";
import { CategoryType } from "../model/Common/Category/CategoryType";
import { WarehouseImage } from "../model/Warehouse/Warehouse/WearhouseImages";
import { OpenTime } from "../model/Warehouse/Showroom/OpeningTime";
import { Color } from "../model/Common/Color";
import { SubCategory } from "../model/Common/Category/SubCategory";
import { Wearhouse } from "../model/Warehouse/Warehouse/Wearhouse";
import { Showroom } from "../model/Warehouse/Showroom/Showroom";
import { ShowroomImages } from "../model/Warehouse/Showroom/ShowroomImages";
import { Pattern } from "../model/Common/Pattern";
import { Characteristics } from "../model/Common/Characteristic";
import { Opacity } from "../model/Common/Opacity";
import { Series } from "../model/Common/Series";
import { UnitType } from "../model/Common/UnitType";
import { Material } from "../model/Common/Material";
import { Weight } from "../model/Common/Weight";
import { CustomId } from "../model/Common/CustomId";
import { Fabric } from "../model/Metirial/Fabric/Fabric";
import { FabricImages } from "../model/Metirial/Fabric/FabricImages";
import { RelatedFabric } from "../model/Metirial/Fabric/RelatedFabric";
import { MaterialStock } from "../model/Metirial/Stock/MaterialStock";
import { MainStock } from "../model/Metirial/Stock/MainStock";
import { Cost } from "../model/Metirial/Cost/Cost";
import { FabricItem } from "../model/Metirial/Fabric/FabricItem";
import { Supplier } from "../model/Metirial/Supplier/Supplier";
import { RowMaterial } from "../model/Metirial/RowMaterial/RowMaterial";
import { RowMaterialImages } from "../model/Metirial/RowMaterial/RowMaterialImages";
import { RelatedRowMaterial } from "../model/Metirial/RowMaterial/RelatedRowMaterial";
import { Admin } from "../model/Admin/Admin";
import { CustomProduct } from "../model/Product/Custom Product/CustomProduct";
import { CustomProductOption } from "../model/Product/Custom Product/CustomProductOption";
import { OptionHidenRule } from "../model/Product/Custom Product/OptionHidenRule";
import { SubOption } from "../model/Product/Custom Product/SubOption";
import { SubOptionFabric } from "../model/Product/Custom Product/SubOptionFabric";
import { SubOptionHidenRule } from "../model/Product/Custom Product/SubOptionHidenRule";
import { CstomProductPackages } from "../model/Product/Packages/CstomProductPackages";
import { MeasurementPackage } from "../model/Product/Packages/MeasurementPackage";
import { PackageElement } from "../model/Product/Packages/PackageElement";
import { PackageImages } from "../model/Product/Packages/PackageImages";
import { PackageProfImages } from "../model/Product/Packages/PackageProfImages";

dotenv.config()

export default class Database{
    public sequelize: Sequelize | undefined;
    //private static instance: Database;

    private PG_DB = process.env.PGDB as string
    private PG_HOST = process.env.PGHOST as string
    private PG_PORT = process.env.PGPORT as unknown as number
    private PG_USERNAME = process.env.PGUSERNAME as unknown as string
    private PG_PASSWORD = process.env.PGPASSWORD as unknown as string

    constructor(){
        this.ConnectToPostgreSQL();
    }
    
    private async ConnectToPostgreSQL(){
        this.sequelize = new Sequelize({
            database:this.PG_DB,
            username:this.PG_USERNAME,
            password:this.PG_PASSWORD,
            host:this.PG_HOST,
            port:this.PG_PORT,
            dialect: "postgres",
            models: [
                Auth, 
                User, 
                Image, 
                Color, Pattern, Characteristics, Material, Opacity, Series, UnitType, Weight,
                CategoryType, Category, SubCategory,
                Wearhouse, WarehouseImage,
                Showroom, ShowroomImages, OpenTime,
                CustomId, Supplier,
                Fabric, FabricImages, RelatedFabric, MaterialStock, MainStock, Cost, FabricItem,
                RowMaterial, RowMaterialImages, RelatedRowMaterial,
                Admin,
                CustomProduct, CustomProductOption, OptionHidenRule, SubOption, SubOptionHidenRule, SubOptionFabric, 
                CstomProductPackages, MeasurementPackage, PackageElement, PackageImages, PackageProfImages
            ]
        });

        this.sequelize
        .authenticate()
        .then(() => {
            console.log(" ✅ PostgreSQL connection has been established successfully. ✅ ");
        })
        .catch((err) =>{
            console.log(" ❌ Unable to connect to the postgreSQL database. ❌ ", err);
        })
    }



}