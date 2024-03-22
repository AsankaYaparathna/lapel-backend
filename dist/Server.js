"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const UserRouts_1 = __importDefault(require("./router/user/UserRouts"));
const AuthRouter_1 = __importDefault(require("./router/auth/AuthRouter"));
const WearhouseRouts_1 = __importDefault(require("./router/wearhouse/WearhouseRouts"));
const ShowroomRouts_1 = __importDefault(require("./router/wearhouse/ShowroomRouts"));
const CommonRouts_1 = __importDefault(require("./router/common/CommonRouts"));
const MaterialRouts_1 = __importDefault(require("./router/Material/MaterialRouts"));
const cors_1 = __importDefault(require("cors"));
const AdminRouter_1 = __importDefault(require("./router/admin/AdminRouter"));
const ProductRouts_1 = __importDefault(require("./router/product/ProductRouts"));
const cloudinary_1 = require("cloudinary");
const CartRouts_1 = __importDefault(require("./router/cart/CartRouts"));
const OrderRouts_1 = __importDefault(require("./router/order/OrderRouts"));
const SessionRouter_1 = __importDefault(require("./router/session/SessionRouter"));
const ShopRouter_1 = __importDefault(require("./router/shop/ShopRouter"));
const StockRouts_1 = __importDefault(require("./router/stock/StockRouts"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.DatabaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    DatabaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => { res.send("Welcome to Lapel Home"); });
        this.app.use("/api/v1/auth", AuthRouter_1.default);
        this.app.use("/api/v1/user", UserRouts_1.default);
        this.app.use("/api/v1/wearhouse", WearhouseRouts_1.default);
        this.app.use("/api/v1/showroom", ShowroomRouts_1.default);
        this.app.use("/api/v1/common", CommonRouts_1.default);
        this.app.use("/api/v1/material", MaterialRouts_1.default);
        this.app.use("/api/v1/stock", StockRouts_1.default);
        this.app.use("/api/v1/admin", AdminRouter_1.default);
        this.app.use("/api/v1/product", ProductRouts_1.default);
        this.app.use("/api/v1/cart", CartRouts_1.default);
        this.app.use("/api/v1/order", OrderRouts_1.default);
        this.app.use("/api/v1/session", SessionRouter_1.default);
        this.app.use("/api/v1/shop", ShopRouter_1.default);
    }
}
const port = 8000;
const app = new App().app;
cloudinary_1.v2.config({
    cloud_name: process.env.IMG_CLDNRY_CLOUD_NAME,
    api_key: process.env.IMG_CLDNRY_API_KEY,
    api_secret: process.env.IMG_CLDNRY_API_SECRET
});
app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
});
