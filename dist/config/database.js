"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv = __importStar(require("dotenv"));
const User_1 = require("../model/Customer/User");
const Auth_1 = require("../model/Auth/Auth");
const Images_1 = require("../model/Common/Images");
const Category_1 = require("../model/Common/Category/Category");
const CategoryType_1 = require("../model/Common/Category/CategoryType");
const WearhouseImages_1 = require("../model/Warehouse/Warehouse/WearhouseImages");
const OpeningTime_1 = require("../model/Warehouse/Showroom/OpeningTime");
const Color_1 = require("../model/Common/Color");
const SubCategory_1 = require("../model/Common/Category/SubCategory");
const Wearhouse_1 = require("../model/Warehouse/Warehouse/Wearhouse");
const Showroom_1 = require("../model/Warehouse/Showroom/Showroom");
const ShowroomImages_1 = require("../model/Warehouse/Showroom/ShowroomImages");
const Pattern_1 = require("../model/Common/Pattern");
const Characteristic_1 = require("../model/Common/Characteristic");
const Opacity_1 = require("../model/Common/Opacity");
const Series_1 = require("../model/Common/Series");
const UnitType_1 = require("../model/Common/UnitType");
const Material_1 = require("../model/Common/Material");
const Weight_1 = require("../model/Common/Weight");
const CustomId_1 = require("../model/Common/CustomId");
const Fabric_1 = require("../model/Metirial/Fabric/Fabric");
const FabricImages_1 = require("../model/Metirial/Fabric/FabricImages");
const RelatedFabric_1 = require("../model/Metirial/Fabric/RelatedFabric");
const MaterialStock_1 = require("../model/Metirial/Stock/MaterialStock");
const MainStock_1 = require("../model/Metirial/Stock/MainStock");
const Cost_1 = require("../model/Metirial/Cost/Cost");
const FabricItem_1 = require("../model/Metirial/Fabric/FabricItem");
const Supplier_1 = require("../model/Metirial/Supplier/Supplier");
const RowMaterial_1 = require("../model/Metirial/RowMaterial/RowMaterial");
const RowMaterialImages_1 = require("../model/Metirial/RowMaterial/RowMaterialImages");
const RelatedRowMaterial_1 = require("../model/Metirial/RowMaterial/RelatedRowMaterial");
const Admin_1 = require("../model/Admin/Admin");
const CustomProduct_1 = require("../model/Product/Custom Product/CustomProduct");
const CustomProductOption_1 = require("../model/Product/Custom Product/CustomProductOption");
const OptionHidenRule_1 = require("../model/Product/Custom Product/OptionHidenRule");
const SubOption_1 = require("../model/Product/Custom Product/SubOption");
const SubOptionFabric_1 = require("../model/Product/Custom Product/SubOptionFabric");
const SubOptionHidenRule_1 = require("../model/Product/Custom Product/SubOptionHidenRule");
const CstomProductPackages_1 = require("../model/Product/Packages/CstomProductPackages");
const MeasurementPackage_1 = require("../model/Product/Packages/MeasurementPackage");
const PackageElement_1 = require("../model/Product/Packages/PackageElement");
const PackageImages_1 = require("../model/Product/Packages/PackageImages");
const PackageProfImages_1 = require("../model/Product/Packages/PackageProfImages");
const BlazerBodyMeasurement_1 = require("../model/Customer/Measurements/Blazer/BlazerBodyMeasurement");
const BlazerStandardSize_1 = require("../model/Customer/Measurements/Blazer/BlazerStandardSize");
const FullBodyMeasurement_1 = require("../model/Customer/Measurements/FullBody/FullBodyMeasurement");
const ShirtBodyMeasurement_1 = require("../model/Customer/Measurements/Shirt/ShirtBodyMeasurement");
const ShirtCopyFavorite_1 = require("../model/Customer/Measurements/Shirt/ShirtCopyFavorite");
const ShirtStandardSize_1 = require("../model/Customer/Measurements/Shirt/ShirtStandardSize");
const TrouserBodyMeasurement_1 = require("../model/Customer/Measurements/Trouser/TrouserBodyMeasurement");
const TrouserCopyFavorite_1 = require("../model/Customer/Measurements/Trouser/TrouserCopyFavorite");
const TrouserStandardSize_1 = require("../model/Customer/Measurements/Trouser/TrouserStandardSize");
const WaistcoatBodyMeasurement_1 = require("../model/Customer/Measurements/Waistcoat/WaistcoatBodyMeasurement");
const WaistcoatStandardSize_1 = require("../model/Customer/Measurements/Waistcoat/WaistcoatStandardSize");
const Cart_1 = require("../model/Cart/Cart");
const CartOrder_1 = require("../model/Cart/CartOrder");
const OrderInvoice_1 = require("../model/Cart/OrderInvoice");
const CartOrderLog_1 = require("../model/Cart/CartOrderLog");
dotenv.config();
class Database {
    constructor() {
        //private static instance: Database;
        this.PG_DB = process.env.PGDB;
        this.PG_HOST = process.env.PGHOST;
        this.PG_PORT = process.env.PGPORT;
        this.PG_USERNAME = process.env.PGUSERNAME;
        this.PG_PASSWORD = process.env.PGPASSWORD;
        this.ConnectToPostgreSQL();
    }
    ConnectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: this.PG_DB,
                username: this.PG_USERNAME,
                password: this.PG_PASSWORD,
                host: this.PG_HOST,
                port: this.PG_PORT,
                dialect: "postgres",
                models: [
                    Auth_1.Auth,
                    User_1.User,
                    Images_1.Image,
                    Color_1.Color, Pattern_1.Pattern, Characteristic_1.Characteristics, Material_1.Material, Opacity_1.Opacity, Series_1.Series, UnitType_1.UnitType, Weight_1.Weight,
                    CategoryType_1.CategoryType, Category_1.Category, SubCategory_1.SubCategory,
                    Wearhouse_1.Wearhouse, WearhouseImages_1.WarehouseImage,
                    Showroom_1.Showroom, ShowroomImages_1.ShowroomImages, OpeningTime_1.OpenTime,
                    CustomId_1.CustomId, Supplier_1.Supplier,
                    Fabric_1.Fabric, FabricImages_1.FabricImages, RelatedFabric_1.RelatedFabric, MaterialStock_1.MaterialStock, MainStock_1.MainStock, Cost_1.Cost, FabricItem_1.FabricItem,
                    RowMaterial_1.RowMaterial, RowMaterialImages_1.RowMaterialImages, RelatedRowMaterial_1.RelatedRowMaterial,
                    Admin_1.Admin,
                    CustomProduct_1.CustomProduct, CustomProductOption_1.CustomProductOption, OptionHidenRule_1.OptionHidenRule, SubOption_1.SubOption, SubOptionHidenRule_1.SubOptionHidenRule, SubOptionFabric_1.SubOptionFabric,
                    CstomProductPackages_1.CstomProductPackages, MeasurementPackage_1.MeasurementPackage, PackageElement_1.PackageElement, PackageImages_1.PackageImages, PackageProfImages_1.PackageProfImages,
                    BlazerBodyMeasurement_1.BlazerBodyMeasurement, BlazerStandardSize_1.BlazerStandardSize,
                    FullBodyMeasurement_1.FullBodyMeasurement,
                    ShirtBodyMeasurement_1.ShirtBodyMeasurement, ShirtStandardSize_1.ShirtStandardSize, ShirtCopyFavorite_1.ShirtCopyFavorite,
                    TrouserBodyMeasurement_1.TrouserBodyMeasurement, TrouserStandardSize_1.TrouserStandardSize, TrouserCopyFavorite_1.TrouserCopyFavorite,
                    WaistcoatBodyMeasurement_1.WaistcoatBodyMeasurement, WaistcoatStandardSize_1.WaistcoatStandardSize,
                    Cart_1.Cart, CartOrder_1.CartOrder, OrderInvoice_1.OrderInvoice, CartOrderLog_1.CartOrderLog
                ]
            });
            this.sequelize
                .authenticate()
                .then(() => {
                console.log(" ✅ PostgreSQL connection has been established successfully. ✅ ");
            })
                .catch((err) => {
                console.log(" ❌ Unable to connect to the postgreSQL database. ❌ ", err);
            });
        });
    }
}
exports.default = Database;
