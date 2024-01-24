import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import UserRouts from "./router/user/UserRouts";
import AuthRouts from "./router/auth/AuthRouter";
import WearhouseRoutes from "./router/wearhouse/WearhouseRouts";
import ShowroomRoutes from "./router/wearhouse/ShowroomRouts";
import CommonRouts from "./router/common/CommonRouts";
import MaterialRouts from "./router/Material/MaterialRouts";
import cors from "cors";
import AdminRouter from "./router/admin/AdminRouter";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.DatabaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected DatabaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome to Lapel Home");
    });
    this.app.use("/api/v1/auth", AuthRouts);
    this.app.use("/api/v1/user", UserRouts);
    this.app.use("/api/v1/wearhouse", WearhouseRoutes);
    this.app.use("/api/v1/showroom", ShowroomRoutes);
    this.app.use("/api/v1/common", CommonRouts);
    this.app.use("/api/v1/material", MaterialRouts);
    this.app.use("/api/v1/admin", AdminRouter);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});
